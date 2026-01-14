import { useRef } from "react";
// We don't have an audio file, so we'll use a short base64 encoded beep or just logic
// For this task, I'll use a silent logic or placeholder. 
// However, the user asked specifically for this, so I will try to implement a simple beep using Web Audio API to avoid external assets.

const useKeyboardSound = () => {
    const audioContext = useRef(null);

    const playSound = () => {
        try {
            if (!audioContext.current) {
                audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            const ctx = audioContext.current;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(800, ctx.currentTime);
            gainNode.gain.setValueAtTime(0.05, ctx.currentTime); // Low volume
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

            oscillator.start();
            oscillator.stop(ctx.currentTime + 0.1);
        } catch (error) {
            // Ignore audio errors (e.g. user interaction policy)
        }
    };

    // Return the play function so it can be used on key press
    return playSound;
};

export default useKeyboardSound;
