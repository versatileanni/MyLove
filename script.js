let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.rotating = false;
    this.mouseTouchX = 0;
    this.mouseTouchY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;

    this.init();
  }

  init() {
    this.paper.style.position = "absolute"; // Ensure absolute positioning
    this.paper.style.transform = `rotateZ(${this.rotation}deg)`;

    this.paper.addEventListener("mousedown", (e) => this.onMouseDown(e));
    document.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("mouseup", () => this.onMouseUp());

    // Prevent right-click menu when rotating
    this.paper.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  onMouseDown(e) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;
    this.mouseTouchX = e.clientX;
    this.mouseTouchY = e.clientY;
    this.prevMouseX = e.clientX;
    this.prevMouseY = e.clientY;

    if (e.button === 2) {
      this.rotating = true;
    }
  }

  onMouseMove(e) {
    if (!this.holdingPaper) return;

    if (this.rotating) {
      // Handle rotation
      let dirX = e.clientX - this.mouseTouchX;
      let dirY = e.clientY - this.mouseTouchY;
      let angle = Math.atan2(dirY, dirX);
      this.rotation = (360 + Math.round((angle * 180) / Math.PI)) % 360;
    } else {
      // Handle dragging
      this.velX = e.clientX - this.prevMouseX;
      this.velY = e.clientY - this.prevMouseY;
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
    }

    this.prevMouseX = e.clientX;
    this.prevMouseY = e.clientY;

    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
  }

  onMouseUp() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

// Apply draggable functionality to all `.paper` elements
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".paper").forEach((paper) => new Paper(paper));
});
