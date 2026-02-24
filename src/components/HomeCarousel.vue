<script setup lang="ts">
import EmblaCarousel from "embla-carousel-vue"
import AutoPlay from "embla-carousel-autoplay"
import { ref, onMounted, useTemplateRef } from "vue"
import { animate, stagger } from "motion"

const titleRef = ref<HTMLHeadingElement | null>(null)
const subtitleRef = ref<HTMLHeadingElement | null>(null)
const container = useTemplateRef("container")

const titleText = "FGF Prayer Vigil"
const subtitleText = "OGUN LAYE (Life Is War)"

const [emblaRef] = EmblaCarousel({
    loop: true,
}, [AutoPlay({
    delay: 5000,
})])

function scroll() {
    if (container.value) {
        window.scrollTo({ top: container.value.clientHeight, behavior: 'smooth' })
    }
}

onMounted(() => {
    // Animate title letters
    if (titleRef.value) {
        const letters = Array.from(titleRef.value.querySelectorAll('.letter'))
        animate(letters,
            { opacity: [0, 1], y: [30, 0] },
            {
                delay: stagger(0.05, { startDelay: 0.2 }),
                duration: 0.3,
                ease: "easeOut"
            }
        )
    }

    // Animate subtitle letters with additional initial delay
    if (subtitleRef.value) {
        const letters = Array.from(subtitleRef.value.querySelectorAll('.letter'))
        animate(letters,
            { opacity: [0, 1], y: [30, 0] },
            {
                delay: stagger(0.05, { startDelay: 0.5 }),
                duration: 0.3,
                ease: "easeOut"
            }
        )
    }
})
</script>

<template>
    <div class="relative" ref="container">
        <div class="embla">
            <div class="embla__viewport" ref="emblaRef">
                <div class="embla__container max-h-[900px]">
                    <div class="embla__slide"><img src="/prayer-1.jpg" loading="lazy" /></div>
                    <div class="embla__slide"><img src="/prayer-2.jpg" loading="lazy" /></div>
                    <div class="embla__slide"><img src="/prayer-3.jpg" loading="lazy" /></div>
                    <div class="embla__slide"><img src="/prayer-4.jpg" loading="lazy" /></div>
                </div>
            </div>

        </div>

        <div class="absolute top-0 left-0 w-full h-full bg-black/60">
            <div class="flex flex-col items-center justify-center h-full">
                <h1 ref="titleRef" class="text-4xl font-bold text-white">
                    <span v-for="(char, index) in titleText" :key="index" class="letter inline-block opacity-0">
                        {{ char === ' ' ? '\u00A0' : char }}
                    </span>
                </h1>
                <h2 ref="subtitleRef" class="text-3xl font-semibold text-white">
                    <span v-for="(char, index) in subtitleText" :key="index" class="letter inline-block opacity-0">
                        {{ char === ' ' ? '\u00A0' : char }}
                    </span>
                </h2>
            </div>

            <div>
                <!--For Arrow-->
                <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer" @click="scroll">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-15 w-15 text-white animate-bounce" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.embla__viewport {
    overflow: hidden;
}

.embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
}

.embla__slide {
    flex: 0 0 100%;
    min-width: 0;
}
</style>