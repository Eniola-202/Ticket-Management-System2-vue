<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-[1440px] mx-auto">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-6 lg:px-12 py-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <TicketCheckIcon class="w-8 h-8 text-indigo-600" />
            <span class="text-2xl font-bold text-gray-800">TicketFlow</span>
          </div>
          <button
            @click="onNavigate('dashboard')"
            class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all font-medium"
          >
            <ArrowLeft class="w-5 h-5" />
            <span class="hidden sm:inline">Back to Dashboard</span>
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <main class="px-6 lg:px-12 py-8">
        <!-- Page Header -->
        <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Ticket Management</h1>
            <p class="text-gray-600">Create, view, edit, and manage your support tickets</p>
          </div>
          <button
            @click="showForm = true"
            class="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
          >
            <Plus class="w-5 h-5" />
            <span>New Ticket</span>
          </button>
        </div>

        <!-- Search and Filter Bar -->
        <div class="bg-white p-4 md:p-6 rounded-2xl shadow-md mb-6 border border-gray-200">
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Search -->
            <div class="flex-1 relative">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                v-model="searchTerm"
                class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <!-- Filter -->
            <div class="relative">
              <Filter class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                v-model="filterStatus"
                class="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white cursor-pointer min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Tickets Grid -->
        <div v-if="filteredTickets.length === 0" class="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-200">
          <TicketCheckIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{ searchTerm || filterStatus !== 'all' ? 'No tickets found' : 'No tickets yet' }}
          </h3>
          <p class="text-gray-600 mb-6">
            {{ searchTerm || filterStatus !== 'all'
              ? 'Try adjusting your search or filter'
              : 'Create your first ticket to get started' }}
          </p>
          <button
            v-if="!searchTerm && filterStatus === 'all'"
            @click="showForm = true"
            class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold"
          >
            <Plus class="w-5 h-5" />
            Create Ticket
          </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 overflow-hidden"
          >
            <!-- Card Header -->
            <div class="p-6 pb-4">
              <div class="flex items-start justify-between mb-3">
                <span :class="`px-3 py-1 rounded-full text-xs font-semibold ${getStatusConfig(ticket.status).bg} ${getStatusConfig(ticket.status).text} flex items-center gap-1`">
                  <component :is="getStatusConfig(ticket.status).icon" class="w-3.5 h-3.5" />
                  {{ getStatusConfig(ticket.status).label }}
                </span>
                <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getPriorityConfig(ticket.priority).bg} ${getPriorityConfig(ticket.priority).text}`">
                  {{ ticket.priority }}
                </span>
              </div>

              <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{{ ticket.title }}</h3>

              <p v-if="ticket.description" class="text-sm text-gray-600 line-clamp-3 mb-4">{{ ticket.description }}</p>

              <p class="text-xs text-gray-500">
                Created {{ formatDate(ticket.createdAt) }}
              </p>
            </div>

            <!-- Card Actions -->
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-2">
              <button
                @click="handleEdit(ticket)"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-all font-medium"
              >
                <Edit2 class="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                @click="handleDelete(ticket.id)"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all font-medium"
              >
                <Trash2 class="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}
          </h2>
          <button
            @click="resetForm"
            class="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X class="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <!-- Modal Body -->
        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- Title -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Title <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              v-model="formData.title"
              @input="handleInputChange"
              :class="`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                formErrors.title ? 'border-red-500' : 'border-gray-300'
              }`"
              placeholder="Enter ticket title"
            />
            <p v-if="formErrors.title" class="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle class="w-4 h-4" />
              {{ formErrors.title }}
            </p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              v-model="formData.description"
              @input="handleInputChange"
              rows="4"
              :class="`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                formErrors.description ? 'border-red-500' : 'border-gray-300'
              }`"
              placeholder="Enter ticket description (optional)"
            />
            <p v-if="formErrors.description" class="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle class="w-4 h-4" />
              {{ formErrors.description }}
            </p>
          </div>

          <!-- Status and Priority Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Status -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Status <span class="text-red-500">*</span>
              </label>
              <select
                name="status"
                v-model="formData.status"
                @change="handleInputChange"
                :class="`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  formErrors.status ? 'border-red-500' : 'border-gray-300'
                }`"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <p v-if="formErrors.status" class="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle class="w-4 h-4" />
                {{ formErrors.status }}
              </p>
            </div>

            <!-- Priority -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Priority
              </label>
              <select
                name="priority"
                v-model="formData.priority"
                @change="handleInputChange"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="resetForm"
              class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-semibold shadow-lg"
            >
              <Save class="w-5 h-5" />
              {{ editingTicket ? 'Update Ticket' : 'Create Ticket' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast.show" class="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div
        :class="`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg ${
          toast.type === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`"
      >
        <CheckCircle v-if="toast.type === 'success'" class="w-5 h-5" />
        <AlertCircle v-else class="w-5 h-5" />
        <span class="font-medium">{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import {
  TicketCheckIcon,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowLeft,
  Search,
  Filter
} from 'lucide-vue-next'

export default {
  name: 'TicketManagement',
  components: {
    TicketCheckIcon,
    Plus,
    Edit2,
    Trash2,
    X,
    Save,
    AlertCircle,
    CheckCircle,
    Clock,
    ArrowLeft,
    Search,
    Filter
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    onNavigate: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    // Reactive state
    const tickets = ref([])
    const filteredTickets = ref([])
    const showForm = ref(false)
    const editingTicket = ref(null)
    const searchTerm = ref('')
    const filterStatus = ref('all')
    const toast = ref({ show: false, message: '', type: '' })

    // Form state
    const formData = ref({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    })

    const formErrors = ref({})

    // Load tickets on mount
    const loadTickets = () => {
      const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]')
      const userTickets = allTickets.filter(ticket => ticket.userId === props.user.id)
      tickets.value = userTickets
    }

    // Filter tickets when search or filter changes
    const filterTickets = () => {
      let filtered = [...tickets.value]

      // Apply status filter
      if (filterStatus.value !== 'all') {
        filtered = filtered.filter(ticket => ticket.status === filterStatus.value)
      }

      // Apply search
      if (searchTerm.value) {
        filtered = filtered.filter(ticket =>
          ticket.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          ticket.description?.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
      }

      filteredTickets.value = filtered
    }

    // Watch for changes to search and filter
    watch([searchTerm, filterStatus, tickets], filterTickets)

    onMounted(() => {
      loadTickets()
    })

    const showToast = (message, type) => {
      toast.value = { show: true, message, type }
      setTimeout(() => {
        toast.value = { show: false, message: '', type: '' }
      }, 4000)
    }

    const validateForm = () => {
      const errors = {}

      if (!formData.value.title.trim()) {
        errors.title = 'Title is required'
      } else if (formData.value.title.length < 3) {
        errors.title = 'Title must be at least 3 characters'
      } else if (formData.value.title.length > 100) {
        errors.title = 'Title must be less than 100 characters'
      }

      if (!['open', 'in_progress', 'closed'].includes(formData.value.status)) {
        errors.status = 'Status must be open, in_progress, or closed'
      }

      if (formData.value.description && formData.value.description.length > 500) {
        errors.description = 'Description must be less than 500 characters'
      }

      formErrors.value = errors
      return Object.keys(errors).length === 0
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target
      formData.value[name] = value
      // Clear error for this field
      if (formErrors.value[name]) {
        formErrors.value = { ...formErrors.value, [name]: '' }
      }
    }

    const handleSubmit = (e) => {
      if (!validateForm()) {
        showToast('Please fix the errors in the form', 'error')
        return
      }

      const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]')

      if (editingTicket.value) {
        // Update existing ticket
        const updatedTickets = allTickets.map(ticket =>
          ticket.id === editingTicket.value.id
            ? { ...ticket, ...formData.value, updatedAt: new Date().toISOString() }
            : ticket
        )
        localStorage.setItem('tickets', JSON.stringify(updatedTickets))
        showToast('Ticket updated successfully!', 'success')
      } else {
        // Create new ticket
        const newTicket = {
          id: Date.now().toString(),
          ...formData.value,
          userId: props.user.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        allTickets.push(newTicket)
        localStorage.setItem('tickets', JSON.stringify(allTickets))
        showToast('Ticket created successfully!', 'success')
      }

      resetForm()
      loadTickets()
    }

    const handleEdit = (ticket) => {
      editingTicket.value = ticket
      formData.value = {
        title: ticket.title,
        description: ticket.description || '',
        status: ticket.status,
        priority: ticket.priority
      }
      showForm.value = true
    }

    const handleDelete = (ticketId) => {
      if (window.confirm('Are you sure you want to delete this ticket?')) {
        const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]')
        const updatedTickets = allTickets.filter(ticket => ticket.id !== ticketId)
        localStorage.setItem('tickets', JSON.stringify(updatedTickets))
        loadTickets()
        showToast('Ticket deleted successfully!', 'success')
      }
    }

    const resetForm = () => {
      formData.value = {
        title: '',
        description: '',
        status: 'open',
        priority: 'medium'
      }
      formErrors.value = {}
      editingTicket.value = null
      showForm.value = false
    }

    const getStatusConfig = (status) => {
      switch (status) {
        case 'open':
          return { bg: 'bg-green-100', text: 'text-green-800', icon: AlertCircle, label: 'Open' }
        case 'in_progress':
          return { bg: 'bg-amber-100', text: 'text-amber-800', icon: Clock, label: 'In Progress' }
        case 'closed':
          return { bg: 'bg-gray-100', text: 'text-gray-800', icon: CheckCircle, label: 'Closed' }
        default:
          return { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertCircle, label: status }
      }
    }

    const getPriorityConfig = (priority) => {
      switch (priority) {
        case 'high':
          return { bg: 'bg-red-100', text: 'text-red-700' }
        case 'medium':
          return { bg: 'bg-yellow-100', text: 'text-yellow-700' }
        case 'low':
          return { bg: 'bg-green-100', text: 'text-green-700' }
        default:
          return { bg: 'bg-gray-100', text: 'text-gray-700' }
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    return {
      tickets,
      filteredTickets,
      showForm,
      editingTicket,
      searchTerm,
      filterStatus,
      toast,
      formData,
      formErrors,
      loadTickets,
      showToast,
      validateForm,
      handleInputChange,
      handleSubmit,
      handleEdit,
      handleDelete,
      resetForm,
      getStatusConfig,
      getPriorityConfig,
      formatDate
    }
  }
}
</script>

<style scoped>
.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>