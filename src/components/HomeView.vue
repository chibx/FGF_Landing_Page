<script setup lang="ts">
import Carousel from './HomeCarousel.vue';


</script>

<template>
    <div>
        <Carousel />

        <div class="flex justify-center">
            <div class="w-2/3 min-w-[350px] flex items-center justify-center gap-10 bg-[#ffecec]">
                <div class="overflow-hidden my-10 shadow-2xl shadow-gray-900">
                    <img class="h-90 sm:h-120 aspect-auto object-cover hover:scale-110 transition-transform duration-500"
                        src="/vigil.jpg" alt="Prayer Vigil" />
                </div>
                <div>
                    <h1 class="text-4xl font-bold text-dark">FGF Prayer Vigil</h1>
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