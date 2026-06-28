// ===================== BROWSER-NATIVE OCEAN AMBIENT AUDIO SYNTHESIZER =====================
// Uses Web Audio API to procedurally generate white noise and apply a modulated 
// low-pass filter to simulate rhythmic ocean waves. No external audio files required!

let audioCtx = null;
let waveNode = null;
let isPlaying = false;

export function initOceanSynthesizer() {
    const audioBtn = document.getElementById('audioToggleBtn');
    if (!audioBtn) return;

    audioBtn.addEventListener('click', () => {
        if (!audioCtx) {
            // Instantiate context upon user interaction (browser security policy)
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (isPlaying) {
            // Fade out smoothly and stop
            if (waveNode && audioCtx) {
                const currentGain = waveNode.gainNode.gain.value;
                waveNode.gainNode.gain.setValueAtTime(currentGain, audioCtx.currentTime);
                waveNode.gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
                
                const currentNoise = waveNode;
                setTimeout(() => {
                    currentNoise.stop();
                }, 2000);
            }
            
            audioBtn.classList.remove('active');
            audioBtn.innerHTML = '🔊';
            isPlaying = false;
        } else {
            // Resume context if suspended
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            // Create procedural white noise buffer
            const bufferSize = audioCtx.sampleRate * 4; // 4 seconds buffer
            const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            
            // Populate buffer with random values (white noise)
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            // Noise Source
            const noiseSource = audioCtx.createBufferSource();
            noiseSource.buffer = noiseBuffer;
            noiseSource.loop = true;

            // Filter to model deep ocean rumbling (Low-pass filter)
            const lowPassFilter = audioCtx.createBiquadFilter();
            lowPassFilter.type = 'lowpass';
            lowPassFilter.Q.value = 1.8;

            // Low Frequency Oscillator (LFO) to control the wave rhythm
            const waveLfo = audioCtx.createOscillator();
            waveLfo.type = 'sine';
            waveLfo.frequency.value = 0.12; // Modulates wave cycle (~8 seconds per wave)

            // Gain node to scale LFO frequency modulation range
            const lfoGain = audioCtx.createGain();
            lfoGain.gain.value = 240; // Sweeps filter cutoff by 240Hz

            // Connect LFO modulator chain
            waveLfo.connect(lfoGain);
            lfoGain.connect(lowPassFilter.frequency);

            // Master Gain node for smooth volume fading
            const masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
            // Fade in over 2.5 seconds to 0.05 volume (subtle background ambient)
            masterGain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 2.5);

            // Connect main synthesis chain
            noiseSource.connect(lowPassFilter);
            lowPassFilter.connect(masterGain);
            masterGain.connect(audioCtx.destination);

            // Start generators
            waveLfo.start();
            noiseSource.start();

            waveNode = {
                gainNode: masterGain,
                stop: () => {
                    try {
                        noiseSource.stop();
                        waveLfo.stop();
                    } catch (e) {
                        // Suppress already stopped error
                    }
                }
            };

            audioBtn.classList.add('active');
            audioBtn.innerHTML = '🔇';
            isPlaying = true;
        }
    });
}
export default initOceanSynthesizer;
