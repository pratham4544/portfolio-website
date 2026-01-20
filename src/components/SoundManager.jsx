import { Howl } from 'howler';

class SoundManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
    this.volume = 0.5;
  }

  // Initialize sounds
  init() {
    this.sounds = {
      chestOpen: new Howl({
        src: ['/sounds/chest-open.mp3'],
        volume: this.volume,
        onloaderror: () => console.warn('Chest sound not found - using fallback')
      }),
      scrollUnroll: new Howl({
        src: ['/sounds/scroll-unroll.mp3'],
        volume: this.volume * 0.7,
        onloaderror: () => console.warn('Scroll sound not found')
      }),
      potionBubble: new Howl({
        src: ['/sounds/potion-bubble.mp3'],
        volume: this.volume * 0.6,
        onloaderror: () => console.warn('Potion sound not found')
      }),
      sparkle: new Howl({
        src: ['/sounds/sparkle.mp3'],
        volume: this.volume * 0.4,
        onloaderror: () => console.warn('Sparkle sound not found')
      }),
      ambience: new Howl({
        src: ['/sounds/ambience.mp3'],
        volume: this.volume * 0.3,
        loop: true,
        onloaderror: () => console.warn('Ambience sound not found')
      })
    };
  }

  play(soundName) {
    if (this.enabled && this.sounds[soundName]) {
      this.sounds[soundName].play();
    }
  }

  playAmbience() {
    if (this.enabled && this.sounds.ambience) {
      this.sounds.ambience.play();
    }
  }

  stopAmbience() {
    if (this.sounds.ambience) {
      this.sounds.ambience.stop();
    }
  }

  setVolume(volume) {
    this.volume = volume;
    Object.values(this.sounds).forEach(sound => {
      sound.volume(volume);
    });
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stopAmbience();
    } else {
      this.playAmbience();
    }
    return this.enabled;
  }
}

export const soundManager = new SoundManager();