<template>
  <div>
    <header class="px-6 lg:px-12 py-6 flex justify-center items-center">
      <div class="flex justify-between items-center gap-4 w-full max-w-6xl">
        <div class="w-50 flex justify-center items-center gap-3">
          <TicketCheck :width="40" :height="40" class="text-indigo-600" />
          <span class="text-2xl font-bold text-blue-950">Get-Tick-et</span>
        </div>
        
        <nav class="flex justify-center items-center gap-3">
          <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">Pricing</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">Resources</a>
        </nav>
      </div>
    </header>

    <section class="relative px-6 lg:px-12 pt-12 pb-32 text-center overflow-hidden">
      <svg 
        class="absolute bottom-0 left-0 w-full h-64 md:h-96" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path 
          fill="#eef2ff" 
          fill-opacity="0.7" 
          d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div class="relative z-10 max-w-5xl mx-auto text-center">
        <div class="inline-block mb-6">
          <span class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
            The Future of Ticket Management in Nigeria
          </span>
        </div>

        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Manage Your Tickets <span class="text-indigo-600 italic">Effortlessly</span>
        </h1>

        <p class="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-tight">
          Streamline your ticketing process with our all-in-one solution designed for efficiency and ease of use.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            @click="handleGetStarted" 
            class="w-full sm:w-auto px-20 py-4 bg-blue-950 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105"
          >
            Get Started
          </button>
          <button 
            @click="handleLogin" 
            class="w-full sm:w-auto px-20 py-4 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105"
          >
            Login
          </button>
        </div>

        <div class="flex justify-center items-center max-w-3xl mx-auto my-8 relative z-10 gap-3">
          <CheckCircle :width="20" :height="20" color="#4F46E5" /> 
          <span>Trusted worldwide</span>
          <CheckCircle :width="20" :height="20" color="#4F46E5" /> 
          <span>Free Trial</span>
          <CheckCircle :width="20" :height="20" color="#4F46E5" /> 
          <span>Cancel anytime</span>
        </div>
      </div>
    </section>

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-8 my-4">
      <div 
        v-for="(item, index) in heroConstants" 
        :key="index" 
        :class="['bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105 hover:-translate-y-1', item.color]"
      >
        <component :is="item.icon" :class="['w-7 h-7', item.iconColor]" />
        <h3 class="font-semibold">{{ item.title }}</h3>
        <p class="text-gray-600 z-10">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle, TicketCheck } from 'lucide-vue-next'
import heroConstants from '../constants/hero'

// Define props
defineProps({
  onNavigate: {
    type: Function,
    required: true
  }
})

// Define emits
const emit = defineEmits(['navigate'])

// Handle button clicks
const handleGetStarted = () => {
  console.log("get started button clicked")
  emit('navigate', 'signup')
}

const handleLogin = () => {
  console.log("login button clicked")
  emit('navigate', 'login')
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>