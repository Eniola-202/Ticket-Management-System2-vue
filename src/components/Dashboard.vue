<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-[1440px] mx-auto">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-6 lg:px-12 py-4 flex justify-between items-center">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <TicketCheckIcon class="w-8 h-8 text-indigo-600" />
            <span class="text-2xl font-bold text-gray-800">TicketFlow</span>
          </div>
          <!-- User Info & Actions -->
          <div class="flex items-center gap-4">
            <div class="hidden md:block text-right">
              <p class="text-sm text-gray-500">Welcome back,</p>
              <p class="text-sm font-semibold text-gray-900">{{ user.name }}!</p>
            </div>
            
            <button
              @click="onLogout"
              class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
            >
              <LogOut class="w-5 h-5" />
              <span class="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Dashboard Content -->
      <main class="px-6 lg:px-12 py-8">
        <!-- Page Title & Quick Actions -->
        <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p class="text-gray-600">Overview of your ticket management system</p>
          </div>
          
          <!-- Quick Action Button -->
          <button
            @click="onNavigate('tickets')"
            class="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
          >
            <Plus class="w-5 h-5" />
            <span>New Ticket</span>
          </button>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Tickets Card -->
          <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TicketCheckIcon class="w-6 h-6 text-blue-600" />
              </div>
              <span class="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                ALL
              </span>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{{ stats.total }}</h3>
            <p class="text-sm text-gray-600 font-medium">Total Tickets</p>
          </div>

          <!-- Open Tickets Card -->
          <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <AlertCircle class="w-6 h-6 text-yellow-600" />
              </div>
              <span class="text-xs font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                OPEN
              </span>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{{ stats.open }}</h3>
            <p class="text-sm text-gray-600 font-medium">Open Tickets</p>
          </div>

          <!-- In Progress Card -->
          <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock class="w-6 h-6 text-purple-600" />
              </div>
              <span class="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                ACTIVE
              </span>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{{ stats.inProgress }}</h3>
            <p class="text-sm text-gray-600 font-medium">In Progress</p>
          </div>

          <!-- Resolved Tickets Card -->
          <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle class="w-6 h-6 text-green-600" />
              </div>
              <span class="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                DONE
              </span>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{{ stats.resolved }}</h3>
            <p class="text-sm text-gray-600 font-medium">Resolved Tickets</p>
          </div>
        </div>

        <!-- Navigation Cards / Quick Links -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <!-- Ticket Management Link -->
          <div 
            @click="onNavigate('tickets')"
            class="bg-linear-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <LayoutDashboard class="w-7 h-7 text-white" />
              </div>
              <ArrowRight class="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Ticket Management</h3>
            <p class="text-indigo-100 mb-4">Create, view, edit, and manage all your support tickets in one place.</p>
            <div class="flex items-center gap-2 text-white font-semibold">
              <span>Manage Tickets</span>
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <!-- Performance Overview -->
          <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div class="flex items-start justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-1">Performance</h3>
                <p class="text-sm text-gray-600">Your ticket resolution rate</p>
              </div>
              <div class="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center">
                <TrendingUp class="w-7 h-7 text-indigo-600" />
              </div>
            </div>

            <!-- Completion Rate -->
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600">Completion Rate</span>
                <span class="text-2xl font-bold text-indigo-600">{{ completionRate }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div 
                  class="bg-linear-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  :style="{ width: `${completionRate}%` }"
                ></div>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div class="text-center">
                <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
                <p class="text-xs text-gray-600">Total</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-yellow-600">{{ stats.open + stats.inProgress }}</p>
                <p class="text-xs text-gray-600">Active</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-green-600">{{ stats.resolved }}</p>
                <p class="text-xs text-gray-600">Resolved</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Tickets -->
        <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-1">Recent Tickets</h2>
              <p class="text-sm text-gray-600">Your latest support requests</p>
            </div>
            <button
              @click="onNavigate('tickets')"
              class="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All
              <ArrowRight class="w-4 h-4" />
            </button>
          </div>

          <div v-if="loading" class="text-center py-12">
            <div class="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-gray-600">Loading tickets...</p>
          </div>

          <div v-else-if="tickets.length === 0" class="text-center py-12">
            <TicketCheckIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No tickets yet</h3>
            <p class="text-gray-600 mb-6">Create your first ticket to get started</p>
            <button
              @click="onNavigate('tickets')"
              class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold"
            >
              <Plus class="w-5 h-5" />
              Create Ticket
            </button>
          </div>

          <div v-else class="space-y-3">
            <div 
              v-for="ticket in recentTickets" 
              :key="ticket.id" 
              class="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all cursor-pointer border border-gray-200"
              @click="onNavigate('tickets')"
            >
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-1">{{ ticket.title }}</h3>
                <div class="flex items-center gap-3 text-sm">
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
                    ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  ]">
                    {{ ticket.priority }}
                  </span>
                  <span class="text-gray-500">
                    {{ formatDate(ticket.createdAt) }}
                  </span>
                </div>
              </div>
              <span :class="[
                'px-4 py-2 rounded-lg text-sm font-medium',
                ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                ticket.status === 'in-progress' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              ]">
                {{ ticket.status === 'in-progress' ? 'In Progress' : ticket.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Actions Footer -->
        <div class="mt-8 p-6 bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-1">Need help getting started?</h3>
              <p class="text-sm text-gray-600">Check out our guide or create your first ticket</p>
            </div>
            <div class="flex gap-3">
              <button
                @click="onNavigate('hero')"
                class="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium shadow-sm"
              >
                <Home class="w-4 h-4" />
                Home
              </button>
              <button
                @click="onNavigate('tickets')"
                class="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium shadow-md"
              >
                <LayoutDashboard class="w-4 h-4" />
                Manage Tickets
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { 
  CheckCircle,
  TicketCheckIcon,
  LogOut,
  Home,
  LayoutDashboard,
  Clock,
  AlertCircle,
  TrendingUp,
  Plus,
  ArrowRight
} from 'lucide-vue-next'

export default {
  name: 'Dashboard',
  components: {
    CheckCircle,
    TicketCheckIcon,
    LogOut,
    Home,
    LayoutDashboard,
    Clock,
    AlertCircle,
    TrendingUp,
    Plus,
    ArrowRight
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    onLogout: {
      type: Function,
      required: true
    },
    onNavigate: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const tickets = ref([])
    const loading = ref(true)

    // Load tickets from localStorage
    const loadTickets = () => {
      if (props.user) {
        const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]')
        const userTickets = allTickets.filter(ticket => ticket.userId === props.user.id)
        tickets.value = userTickets
        loading.value = false
      }
    }

    onMounted(() => {
      loadTickets()
    })

    // Calculate statistics
    const stats = computed(() => {
      return {
        total: tickets.value.length,
        open: tickets.value.filter(t => t.status === 'Open' || t.status === 'open').length,
        inProgress: tickets.value.filter(t => t.status === 'In Progress' || t.status === 'in-progress').length,
        resolved: tickets.value.filter(t => t.status === 'closed' || t.status === 'resolved').length,
      }
    })

    // Calculate completion rate
    const completionRate = computed(() => {
      return stats.value.total > 0 ? Math.round((stats.value.resolved / stats.value.total) * 100) : 0
    })

    // Get recent tickets (first 5)
    const recentTickets = computed(() => {
      return tickets.value.slice(0, 5)
    })

    // Format date
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    return {
      tickets,
      loading,
      stats,
      completionRate,
      recentTickets,
      formatDate
    }
  }
}
</script>