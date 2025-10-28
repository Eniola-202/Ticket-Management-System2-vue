<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-6 py-12">
    <!-- Toast Notification -->
    <Toast 
      v-if="toast"
      :message="toast.message" 
      :type="toast.type" 
      @close="setToast(null)" 
    />

    <div class="max-w-md w-full">
      <!-- Auth Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
        <!-- Logo & Title -->
        <div class="text-center mb-8">
          <div class="flex items-center justify-center gap-2 mb-4">
            <TicketCheckIcon class="w-10 h-10 text-indigo-600" />
            <span class="text-3xl font-bold text-gray-800">TicketFlow</span>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p class="text-gray-600">
            Sign in to manage your tickets
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Email Field -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              v-model="formData.email"
              @input="handleChange('email', $event.target.value)"
              :class="[
                'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                errors.email 
                  ? 'border-red-400 focus:border-red-500' 
                  : 'border-gray-300 focus:border-indigo-500'
              ]"
              placeholder="you@example.com"
            />
            <p v-if="errors.email" class="mt-2 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle class="w-4 h-4" />
              {{ errors.email }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              v-model="formData.password"
              @input="handleChange('password', $event.target.value)"
              :class="[
                'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                errors.password 
                  ? 'border-red-400 focus:border-red-500' 
                  : 'border-gray-300 focus:border-indigo-500'
              ]"
              placeholder="••••••••"
            />
            <p v-if="errors.password" class="mt-2 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle class="w-4 h-4" />
              {{ errors.password }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            :class="[
              'w-full py-3.5 bg-indigo-600 text-white rounded-lg font-semibold transition-all',
              isSubmitting 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:bg-indigo-700 hover:shadow-lg hover:scale-[1.02]'
            ]"
          >
            <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
              <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Toggle Login/Signup -->
        <p class="mt-6 text-center text-gray-600">
          Don't have an account?
          <button
            @click="onBack('signup')"
            class="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>

        <!-- Back to Home -->
        <button
          @click="onBack"
          class="mt-4 w-full py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
        >
          ← Back to Home
        </button>

        <!-- Demo Credentials (for testing) -->
        <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p class="text-sm text-blue-800 font-semibold mb-2">Demo Account:</p>
          <p class="text-xs text-blue-700">Email: demo@ticketflow.com</p>
          <p class="text-xs text-blue-700">Password: demo123</p>
        </div>
      </div>

      <!-- Additional Info -->
      <p class="text-center mt-6 text-sm text-gray-600">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { TicketCheckIcon, AlertCircle } from 'lucide-vue-next'
import { useAuth, validateEmail, validatePassword, Toast } from '../constants/contants'

export default {
  name: 'Login',
  components: {
    TicketCheckIcon,
    AlertCircle,
    Toast
  },
  props: {
    onAuthSuccess: {
      type: Function,
      required: true
    },
    onBack: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const { login } = useAuth()
    const formData = ref({ email: '', password: '' })
    const errors = ref({ email: '', password: '' })
    const toast = ref(null)
    const isSubmitting = ref(false)

    const handleChange = (field, value) => {
      formData.value[field] = value
      errors.value[field] = ''
    }

    const validateForm = () => {
      const newErrors = {
        email: validateEmail(formData.value.email),
        password: validatePassword(formData.value.password)
      }
      
      errors.value = newErrors
      return !Object.values(newErrors).some(error => error !== '')
    }

    const handleSubmit = async (e) => {
      if (!validateForm()) {
        toast.value = { type: 'error', message: 'Please fix the errors in the form' }
        return
      }

      isSubmitting.value = true
      await new Promise(resolve => setTimeout(resolve, 800))

      const result = login(formData.value.email, formData.value.password)
      isSubmitting.value = false

      if (result.success) {
        toast.value = { type: 'success', message: 'Login successful! Redirecting...' }
        setTimeout(() => props.onAuthSuccess(result.user), 1500)
      } else {
        toast.value = { type: 'error', message: result.error }
      }
    }

    const setToast = (value) => {
      toast.value = value
    }

    return {
      formData,
      errors,
      toast,
      isSubmitting,
      handleChange,
      handleSubmit,
      setToast
    }
  }
}
</script>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>