/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Breath
 *
 * The temple breathes with consciousness itself.
 * Sacred words glow and drift like stars in the cosmos.
 * Mandalas turn with the eternal wheel of dharma.
 * Everything alive, everything breathing, everything one.
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SACRED CONFIGURATION
 * All temporal and spatial parameters governing the temple's living presence
 * ═══════════════════════════════════════════════════════════════════════════
 */

const SACRED_TIMING = {
    // Word Glow - Three-wave breathing cycle
    GLOW_PRIMARY_FREQ_MIN: 0.08,      // Slowest deep breath (Hz)
    GLOW_PRIMARY_FREQ_MAX: 0.15,      // Fastest deep breath (Hz)
    GLOW_PRIMARY_AMPLITUDE_MIN: 0.15, // Minimum breath depth
    GLOW_PRIMARY_AMPLITUDE_MAX: 0.20, // Maximum breath depth

    GLOW_SECONDARY_FREQ_MIN: 0.2,     // Shimmer frequency min (Hz)
    GLOW_SECONDARY_FREQ_MAX: 0.35,    // Shimmer frequency max (Hz)
    GLOW_SECONDARY_AMPLITUDE_MIN: 0.04,
    GLOW_SECONDARY_AMPLITUDE_MAX: 0.07,

    GLOW_TERTIARY_FREQ_MIN: 0.5,      // Subtle flicker min (Hz)
    GLOW_TERTIARY_FREQ_MAX: 0.9,      // Subtle flicker max (Hz)
    GLOW_TERTIARY_AMPLITUDE_MIN: 0.01,
    GLOW_TERTIARY_AMPLITUDE_MAX: 0.03,

    // Word Glow - Intensity values
    GLOW_BASE_OPACITY: 0.75,          // Starting opacity
    GLOW_MIN_OPACITY: 0.7,            // Dimmest breath
    GLOW_MAX_OPACITY: 1.0,            // Brightest breath
    GLOW_MIN_INTENSITY: 10,           // Minimum glow radius (px)
    GLOW_MAX_INTENSITY: 120,          // Maximum glow radius (px)
    GLOW_LAYER_1: 0.8,                // Inner glow multiplier
    GLOW_LAYER_2: 1.4,                // Mid glow multiplier
    GLOW_LAYER_3: 2.2,                // Outer glow multiplier
    GLOW_LAYER_4: 3.5,                // Outermost glow multiplier

    // Word Scale - Subtle size breathing
    SCALE_VARIATION: 0.06,            // Creates 0.97-1.03 range

    // Mandala Rotation - Eternal wheel turning
    MANDALA_ROTATION_MIN: 1200,       // 20 minutes per rotation (seconds)
    MANDALA_ROTATION_MAX: 1800,       // 30 minutes per rotation (seconds)
    MANDALA_BREATH_FREQ_MIN: 0.15,    // Opacity breathing min (Hz)
    MANDALA_BREATH_FREQ_MAX: 0.25,    // Opacity breathing max (Hz)
    MANDALA_BASE_OPACITY: 0.8,        // Starting opacity
    MANDALA_BREATH_AMPLITUDE: 0.08,   // Opacity variation range

    // Mask Breathing - Image edge transparency
    MASK_BREATH_FREQ_MIN: 0.1,        // Slowest edge breathing (Hz)
    MASK_BREATH_FREQ_MAX: 0.2,        // Fastest edge breathing (Hz)
    MASK_FADE_MIN: 10,                // Minimum edge fade (%)
    MASK_FADE_MAX: 20,                // Maximum edge fade (%)
};

const SPATIAL_QUALITIES = {
    // Word Drift - Gentle floating movement
    DRIFT_RANGE: 15,                  // Maximum drift distance (px)
    DRIFT_SPEED: 0.1,                 // Base drift velocity
    DRIFT_VARIATION: 0.05,            // Random velocity changes
    DRIFT_DAMPENING: 0.95,            // Velocity decay (closer to 1 = less friction)
    DRIFT_BOUNCE: -0.5,               // Boundary bounce factor
};

// Utilities
const random = (min, max) => Math.random() * (max - min) + min;

/**
 * Smooth organic glow using sine waves
 * Each word breathes with continuous, living luminosity
 */
function glow(word) {
    // Each word gets unique glow parameters for organic variation
    const glowState = {
        // Primary breathing cycle (very slow, deep)
        frequency1: random(SACRED_TIMING.GLOW_PRIMARY_FREQ_MIN, SACRED_TIMING.GLOW_PRIMARY_FREQ_MAX) * Math.PI * 2,
        phase1: random(0, Math.PI * 2),
        amplitude1: random(SACRED_TIMING.GLOW_PRIMARY_AMPLITUDE_MIN, SACRED_TIMING.GLOW_PRIMARY_AMPLITUDE_MAX),

        // Secondary shimmer (slow)
        frequency2: random(SACRED_TIMING.GLOW_SECONDARY_FREQ_MIN, SACRED_TIMING.GLOW_SECONDARY_FREQ_MAX) * Math.PI * 2,
        phase2: random(0, Math.PI * 2),
        amplitude2: random(SACRED_TIMING.GLOW_SECONDARY_AMPLITUDE_MIN, SACRED_TIMING.GLOW_SECONDARY_AMPLITUDE_MAX),

        // Tertiary flicker (very subtle)
        frequency3: random(SACRED_TIMING.GLOW_TERTIARY_FREQ_MIN, SACRED_TIMING.GLOW_TERTIARY_FREQ_MAX) * Math.PI * 2,
        phase3: random(0, Math.PI * 2),
        amplitude3: random(SACRED_TIMING.GLOW_TERTIARY_AMPLITUDE_MIN, SACRED_TIMING.GLOW_TERTIARY_AMPLITUDE_MAX),

        // Base values
        baseOpacity: SACRED_TIMING.GLOW_BASE_OPACITY
    };

    word.glowState = glowState;

    function updateGlow(time) {
        if (!word.glowState) return;

        // Performance: skip if paused (off-screen or reduced motion)
        if (word.glowState.paused) {
            requestAnimationFrame(updateGlow);
            return;
        }

        const t = time * 0.001; // Convert to seconds
        const state = word.glowState;

        // Combine three sine waves for organic complexity
        const wave1 = Math.sin(t * state.frequency1 + state.phase1) * state.amplitude1;
        const wave2 = Math.sin(t * state.frequency2 + state.phase2) * state.amplitude2;
        const wave3 = Math.sin(t * state.frequency3 + state.phase3) * state.amplitude3;

        const combined = wave1 + wave2 + wave3;

        // Map combined wave (-0.4 to +0.4) to glow range (more dramatic for intensity breathing)
        const normalizedWave = (combined + 0.4) / 0.8; // normalize to 0-1

        // Dramatically increase glow range for intensity effect
        const glowAmount = SACRED_TIMING.GLOW_MIN_INTENSITY +
            (SACRED_TIMING.GLOW_MAX_INTENSITY - SACRED_TIMING.GLOW_MIN_INTENSITY) * normalizedWave;

        const glow1 = glowAmount * SACRED_TIMING.GLOW_LAYER_1;
        const glow2 = glowAmount * SACRED_TIMING.GLOW_LAYER_2;
        const glow3 = glowAmount * SACRED_TIMING.GLOW_LAYER_3;
        const glow4 = glowAmount * SACRED_TIMING.GLOW_LAYER_4;

        // Calculate opacity breathing
        const opacity = Math.max(
            SACRED_TIMING.GLOW_MIN_OPACITY,
            Math.min(SACRED_TIMING.GLOW_MAX_OPACITY, state.baseOpacity + combined)
        );

        // Calculate subtle scale breathing
        const scale = 1.0 + (normalizedWave - 0.5) * SACRED_TIMING.SCALE_VARIATION;
        state.currentScale = scale;

        // Intensity breathing through both glow and opacity
        word.style.opacity = opacity;
        // Use CSS custom properties for better performance
        word.style.setProperty('--glow-1', `${glow1}px`);
        word.style.setProperty('--glow-2', `${glow2}px`);
        word.style.setProperty('--glow-3', `${glow3}px`);
        word.style.setProperty('--glow-4', `${glow4}px`);

        requestAnimationFrame(updateGlow);
    }

    requestAnimationFrame(updateGlow);
}

/**
 * Sacred mandala animation
 * Slow eternal rotation with subtle breathing luminosity
 */
function animateMandala(mandala) {
    const mandalaState = {
        // Rotation - each mandala has unique tempo (20-30 minutes per full rotation)
        rotationSpeed: random(
            1 / SACRED_TIMING.MANDALA_ROTATION_MAX,
            1 / SACRED_TIMING.MANDALA_ROTATION_MIN
        ) * Math.PI * 2, // radians per second

        // Breathing glow - very subtle and slow
        frequency: random(SACRED_TIMING.MANDALA_BREATH_FREQ_MIN, SACRED_TIMING.MANDALA_BREATH_FREQ_MAX) * Math.PI * 2,
        phase: random(0, Math.PI * 2),
        baseOpacity: SACRED_TIMING.MANDALA_BASE_OPACITY,
        amplitude: SACRED_TIMING.MANDALA_BREATH_AMPLITUDE
    };

    mandala.mandalaState = mandalaState;

    function updateMandala(time) {
        if (!mandala.mandalaState) return;

        // Performance: skip if paused (off-screen or reduced motion)
        if (mandala.mandalaState.paused) {
            requestAnimationFrame(updateMandala);
            return;
        }

        const t = time * 0.001; // Convert to seconds
        const state = mandala.mandalaState;

        // Slow continuous rotation
        const rotation = (t * state.rotationSpeed) % (Math.PI * 2);
        const degrees = rotation * (180 / Math.PI);

        // Subtle breathing through subtle opacity variation (very gentle)
        const breathe = Math.sin(t * state.frequency + state.phase) * state.amplitude;
        const opacity = state.baseOpacity + breathe;

        // Apply transformations (opacity range: 0.72 - 0.88)
        mandala.style.transform = `rotate(${degrees}deg)`;
        mandala.style.opacity = opacity;

        requestAnimationFrame(updateMandala);
    }

    requestAnimationFrame(updateMandala);
}

/**
 * Gentle drift animation
 * Each word has its own random walk trajectory, creating organic movement
 */
function drift(word) {
    if (!word) {
        return;
    }

    // Initialize drift state
    word.style.position = 'relative';
    word.style.display = 'inline-block'; // Required for transform to work
    word.driftState = {
        x: 0,
        y: 0,
        vx: random(-SPATIAL_QUALITIES.DRIFT_SPEED, SPATIAL_QUALITIES.DRIFT_SPEED),
        vy: random(-SPATIAL_QUALITIES.DRIFT_SPEED, SPATIAL_QUALITIES.DRIFT_SPEED),
        time: 0
    };

    function updateDrift(timestamp) {
        if (!word.driftState) return;

        // Performance: skip if paused (off-screen or reduced motion)
        if (word.driftState.paused) {
            requestAnimationFrame(updateDrift);
            return;
        }

        const state = word.driftState;
        state.time = timestamp;

        // Update velocities with small random changes (random walk)
        const variation = SPATIAL_QUALITIES.DRIFT_SPEED * SPATIAL_QUALITIES.DRIFT_VARIATION;
        state.vx += random(-variation, variation);
        state.vy += random(-variation, variation);

        // Dampen velocities to keep them in range (more dampening = smoother)
        state.vx *= SPATIAL_QUALITIES.DRIFT_DAMPENING;
        state.vy *= SPATIAL_QUALITIES.DRIFT_DAMPENING;

        // Update positions
        state.x += state.vx;
        state.y += state.vy;

        // Gently bounce back if drifting too far
        if (Math.abs(state.x) > SPATIAL_QUALITIES.DRIFT_RANGE) {
            state.vx *= SPATIAL_QUALITIES.DRIFT_BOUNCE;
            state.x = Math.sign(state.x) * SPATIAL_QUALITIES.DRIFT_RANGE;
        }
        if (Math.abs(state.y) > SPATIAL_QUALITIES.DRIFT_RANGE) {
            state.vy *= SPATIAL_QUALITIES.DRIFT_BOUNCE;
            state.y = Math.sign(state.y) * SPATIAL_QUALITIES.DRIFT_RANGE;
        }

        // Apply the transform with scale from glow breathing
        const scale = word.glowState?.currentScale || 1.0;
        word.style.transform = `translate(${state.x}px, ${state.y}px) scale(${scale})`;

        // Continue the animation
        requestAnimationFrame(updateDrift);
    }

    requestAnimationFrame(updateDrift);
}

/**
 * Breathing transparency effect for images
 * The edges breathe, varying between more and less fade
 */
function breatheMask(element) {
    const maskState = {
        // Slow breathing cycle
        frequency: random(SACRED_TIMING.MASK_BREATH_FREQ_MIN, SACRED_TIMING.MASK_BREATH_FREQ_MAX) * Math.PI * 2,
        phase: random(0, Math.PI * 2),
        minFade: SACRED_TIMING.MASK_FADE_MIN,
        maxFade: SACRED_TIMING.MASK_FADE_MAX
    };

    element.maskState = maskState;

    function updateMask(time) {
        if (!element.maskState) return;

        // Performance: skip if paused (off-screen or reduced motion)
        if (element.maskState.paused) {
            requestAnimationFrame(updateMask);
            return;
        }

        const t = time * 0.001;
        const state = element.maskState;

        // Calculate breathing fade amount
        const breathe = Math.sin(t * state.frequency + state.phase);
        const fadeAmount = state.minFade + ((breathe + 1) / 2) * (state.maxFade - state.minFade);

        const innerEdge = fadeAmount;
        const outerEdge = 100 - fadeAmount;

        // Update the mask gradients
        const maskValue = `linear-gradient(to bottom,
            transparent 0%,
            black ${innerEdge}%,
            black ${outerEdge}%,
            transparent 100%),
            linear-gradient(to right,
            transparent 0%,
            black ${innerEdge}%,
            black ${outerEdge}%,
            transparent 100%)`;

        element.style.maskImage = maskValue;
        element.style.webkitMaskImage = maskValue;

        requestAnimationFrame(updateMask);
    }

    requestAnimationFrame(updateMask);
}

/**
 * Performance optimization - pause animations when off-screen or reduced motion preferred
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// IntersectionObserver to pause off-screen animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const element = entry.target;
        if (element.glowState) {
            element.glowState.paused = !entry.isIntersecting || prefersReducedMotion;
        }
        if (element.driftState) {
            element.driftState.paused = !entry.isIntersecting || prefersReducedMotion;
        }
        if (element.mandalaState) {
            element.mandalaState.paused = !entry.isIntersecting || prefersReducedMotion;
        }
        if (element.maskState) {
            element.maskState.paused = !entry.isIntersecting || prefersReducedMotion;
        }
    });
}, {
    rootMargin: '50px' // Start animating slightly before element enters viewport
});

/**
 * Initialize the temple breath
 * When the temple appears, everything begins its eternal dance
 */
document.addEventListener('DOMContentLoaded', () => {
    // Breathe the title
    const title = document.querySelector('h1');
    if (title) {
        glow(title);
        animationObserver.observe(title);
    }

    // Begin the glow and drift cycles for each sacred word
    const words = document.querySelectorAll('.word');
    words.forEach((word) => {
        glow(word);
        drift(word);
        animationObserver.observe(word);
    });

    // Animate the sacred mandalas
    const mandalas = document.querySelectorAll('.mandala');
    mandalas.forEach((mandala) => {
        animateMandala(mandala);
        breatheMask(mandala);
        animationObserver.observe(mandala);
    });

    // Breathe the transparency on all images
    const angels = document.querySelectorAll('.angel');
    angels.forEach((angel) => {
        breatheMask(angel);
        animationObserver.observe(angel);
    });

    const altars = document.querySelectorAll('.altar');
    altars.forEach((altar) => {
        breatheMask(altar);
        animationObserver.observe(altar);
    });

    const offerings = document.querySelectorAll('.offering');
    offerings.forEach((offering) => {
        breatheMask(offering);
        animationObserver.observe(offering);
    });
});
