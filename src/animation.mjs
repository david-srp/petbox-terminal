const FRAME_MS = 500;
const IDLE_FRAMES = 15;
const HEART_FRAMES = 5;

export class AnimationLoop {
  constructor(onFrame) {
    this.onFrame = onFrame;
    this.frame = 0;
    this.mode = 'idle'; // 'idle' | 'hearts'
    this.heartFrame = 0;
    this.timer = null;
  }

  start() {
    this.timer = setInterval(() => this.tick(), FRAME_MS);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  tick() {
    if (this.mode === 'hearts') {
      this.heartFrame++;
      if (this.heartFrame >= HEART_FRAMES) {
        this.mode = 'idle';
        this.heartFrame = 0;
      }
      this.onFrame({ mode: 'hearts', frame: this.heartFrame });
    } else {
      this.frame = (this.frame + 1) % IDLE_FRAMES;
      this.onFrame({ mode: 'idle', frame: this.frame });
    }
  }

  triggerHearts() {
    this.mode = 'hearts';
    this.heartFrame = 0;
  }
}
