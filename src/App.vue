<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-[1440px] mx-auto">
      
      <!-- CONDITIONALLY RENDER BASED ON CURRENT PAGE -->
      
      <template v-if="currentPage === 'hero'">
        <Hero @navigate="navigateTo" />
        <Footer />
      </template>

      <Login 
        v-if="currentPage === 'login'"
        @auth-success="handleAuthSuccess"
        @back="navigateTo('hero')"
      />

      <Signup 
        v-if="currentPage === 'signup'"
        @auth-success="handleAuthSuccess"
        @back="navigateTo('hero')"
      />

      <template v-if="currentPage === 'dashboard' && user">
        <Dashboard 
          :user="user"
          @logout="handleLogout"
          @navigate="navigateTo"
        />
        <Footer />
      </template>

      <template v-if="currentPage === 'tickets' && user">
        <TicketManagement 
          :user="user"
          @navigate="navigateTo"
        />
        <Footer />
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Hero from './components/Hero.vue'
import Footer from './components/Footer.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Dashboard from './components/Dashboard.vue'
import TicketManagement from './components/TicketManagement.vue'

// Track which page to show
const currentPage = ref('hero') // 'hero', 'login', 'signup', 'dashboard', 'tickets'

// Track logged-in user
const user = ref(null)

// Check if user is already logged in (on page load)
onMounted(() => {
  const savedUser = localStorage.getItem('currentUser')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
    currentPage.value = 'dashboard'
  }
})

// Handle successful authentication
const handleAuthSuccess = (userData) => {
  user.value = userData
  localStorage.setItem('currentUser', JSON.stringify(userData))
  currentPage.value = 'dashboard'
}

// Handle logout
const handleLogout = () => {
  user.value = null
  localStorage.removeItem('currentUser')
  currentPage.value = 'hero'
}

// Navigate between pages
const navigateTo = (page) => {
  console.log(`clicked ${page}`)
  currentPage.value = page
}
</script>

<style>
/* Your global styles can go here or import your CSS */
@import './App.css';
</style>