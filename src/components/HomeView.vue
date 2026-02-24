<script setup lang="ts">
import Carousel from './HomeCarousel.vue';
import { ref, reactive } from 'vue';
import { Send, MapPin, Phone, Mail, Clock, Users, Music, BookOpen } from 'lucide-vue-next';

const formData = reactive({
    full_name: '',
    email: '',
    address: '',
    phone_number: '',
    first_timer: false
});

const isSubmitting = ref(false);
const submitMessage = ref('');
const submitError = ref(false);

async function handleSubmit() {
    isSubmitting.value = true;
    submitMessage.value = '';
    submitError.value = false;

    const data = new FormData();
    data.append('full_name', formData.full_name);
    data.append('email', formData.email);
    data.append('address', formData.address);
    data.append('phone_number', formData.phone_number);
    data.append('first_timer', formData.first_timer ? 'true' : 'false');

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            body: data
        });
        const result = await response.json();

        if (result.success) {
            submitMessage.value = 'Registration successful! We look forward to seeing you.';
            formData.full_name = '';
            formData.email = '';
            formData.address = '';
            formData.phone_number = '';
            formData.first_timer = false;
        } else {
            submitError.value = true;
            submitMessage.value = result.error || 'Registration failed. Please try again.';
        }
    } catch {
        submitError.value = true;
        submitMessage.value = 'Something went wrong. Please try again later.';
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<template>
    <div class="min-h-screen bg-white">
        <Carousel />

        <!-- About Section -->
        <section class="py-16 px-4 sm:px-6 lg:px-8">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-col lg:flex-row items-center gap-12">
                    <div class="w-full lg:w-1/2">
                        <div class="overflow-hidden rounded-2xl shadow-2xl shadow-gray-400/50">
                            <img class="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                src="/vigil.jpg" alt="Prayer Vigil" />
                        </div>
                    </div>
                    <div class="w-full lg:w-1/2 space-y-6">
                        <div class="inline-block px-4 py-1 bg-rose-50 rounded-full">
                            <span class="text-rose-600 text-sm font-medium">Join Us in Prayer</span>
                        </div>
                        <h2 class="text-4xl font-bold text-gray-900">FGF Prayer Vigil</h2>
                        <h3 class="text-2xl font-semibold text-gray-700">OGUN LAYE (Life Is War)</h3>
                        <p class="text-gray-600 leading-relaxed">
                            Join us for a powerful night of prayer, worship, and spiritual warfare.
                            As believers, we understand that life is a spiritual battle, and through
                            prayer and fellowship, we find strength and victory in Christ.
                        </p>
                        <div class="flex flex-wrap gap-4 pt-4">
                            <div class="flex items-center gap-2 text-gray-700">
                                <Clock class="w-5 h-5 text-rose-500" />
                                <span>All Night</span>
                            </div>
                            <div class="flex items-center gap-2 text-gray-700">
                                <MapPin class="w-5 h-5 text-rose-500" />
                                <span>FGF Headquarters</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features/Highlights Section -->
        <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50/50 to-white">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">What to Expect</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">An evening filled with spiritual nourishment and
                        community fellowship</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div
                        class="bg-white p-6 rounded-xl shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow border border-rose-100">
                        <div class="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                            <BookOpen class="w-6 h-6 text-rose-600" />
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">Prayer Sessions</h3>
                        <p class="text-gray-600 text-sm">Intensive prayer and intercession for breakthroughs</p>
                    </div>

                    <div
                        class="bg-white p-6 rounded-xl shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow border border-rose-100">
                        <div class="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                            <Music class="w-6 h-6 text-rose-600" />
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">Worship</h3>
                        <p class="text-gray-600 text-sm">Soul-lifting praise and worship experience</p>
                    </div>

                    <div
                        class="bg-white p-6 rounded-xl shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow border border-rose-100">
                        <div class="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                            <Users class="w-6 h-6 text-rose-600" />
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">Fellowship</h3>
                        <p class="text-gray-600 text-sm">Connect with believers and build community</p>
                    </div>

                    <div
                        class="bg-white p-6 rounded-xl shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow border border-rose-100">
                        <div class="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                            <Send class="w-6 h-6 text-rose-600" />
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">Ministration</h3>
                        <p class="text-gray-600 text-sm">Powerful word and spiritual ministration</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Image Gallery -->
        <section class="py-16 px-4 sm:px-6 lg:px-8">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Moments from Our Fellowship</h2>
                    <p class="text-gray-600">Glimpses of our time together in worship and prayer</p>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div class="overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
                        <img src="/prayer-1.jpg" alt="Prayer"
                            class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div class="overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
                        <img src="/worship.jpg" alt="Worship"
                            class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div class="overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
                        <img src="/prayer-2.jpg" alt="Prayer"
                            class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div class="overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
                        <img src="/sermon.jpg" alt="Sermon"
                            class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div class="overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
                        <img src="/prayer-3.jpg" alt="Prayer"
                            class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div class="overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
                        <img src="/music.jpg" alt="Music"
                            class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Registration Form Section -->
        <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            <div class="max-w-2xl mx-auto">
                <div class="text-center mb-10">
                    <h2 class="text-3xl font-bold mb-4">Register for the Vigil</h2>
                    <p class="text-gray-400">Fill in your details to secure your spot at this life-changing event</p>
                </div>

                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label for="full_name" class="text-sm font-medium text-gray-300">Full Name</label>
                            <input id="full_name" v-model="formData.full_name" type="text" required
                                placeholder="Enter your full name"
                                class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all" />
                        </div>

                        <div class="space-y-2">
                            <label for="email" class="text-sm font-medium text-gray-300">Email</label>
                            <input id="email" v-model="formData.email" type="email" required
                                placeholder="Enter your email"
                                class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label for="phone_number" class="text-sm font-medium text-gray-300">Phone Number</label>
                            <input id="phone_number" v-model="formData.phone_number" type="tel" required
                                placeholder="Enter your phone number"
                                class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all" />
                        </div>

                        <div class="space-y-2">
                            <label for="address" class="text-sm font-medium text-gray-300">Address</label>
                            <input id="address" v-model="formData.address" type="text" required
                                placeholder="Enter your address"
                                class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all" />
                        </div>
                    </div>

                    <div class="flex items-center gap-3 pt-2">
                        <input id="first_timer" v-model="formData.first_timer" type="checkbox"
                            class="w-5 h-5 rounded border-white/20 bg-white/10 text-rose-500 focus:ring-rose-500 focus:ring-offset-0" />
                        <label for="first_timer" class="text-gray-300">This is my first time attending</label>
                    </div>

                    <button type="submit" :disabled="isSubmitting"
                        class="w-full py-4 px-6 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-white shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-300 flex items-center justify-center gap-2">
                        <span v-if="isSubmitting">Submitting...</span>
                        <span v-else>Register Now</span>
                        <Send v-if="!isSubmitting" class="w-5 h-5" />
                    </button>

                    <div v-if="submitMessage"
                        :class="['p-4 rounded-lg text-center', submitError ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200']">
                        {{ submitMessage }}
                    </div>
                </form>
            </div>
        </section>

        <!-- Footer -->
        <footer class="py-12 px-4 sm:px-6 lg:px-8 bg-gray-950 border-t border-gray-800">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div class="flex items-center gap-4">
                        <img src="/fgf_logo.jpg" alt="FGF Logo" class="h-12 w-auto rounded-lg" />
                        <div>
                            <h3 class="font-bold text-white">FGF Ministry</h3>
                            <p class="text-gray-400 text-sm">Faith, Grace & Fellowship</p>
                        </div>
                    </div>

                    <div class="flex flex-wrap justify-center gap-6 text-gray-400">
                        <div class="flex items-center gap-2">
                            <Phone class="w-4 h-4 text-rose-500" />
                            <span class="text-sm">Contact Us</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <Mail class="w-4 h-4 text-rose-500" />
                            <span class="text-sm">info@fgfministry.org</span>
                        </div>
                    </div>
                </div>

                <div class="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p class="text-gray-500 text-sm">
                        &copy; {{ new Date().getFullYear() }} FGF Ministry. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped></style>