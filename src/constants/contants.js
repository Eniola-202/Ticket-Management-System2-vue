import { ref, onMounted, onUnmounted } from 'vue';
import { CheckCircle, AlertCircle, X } from 'lucide-vue-next';

// ============================================
// AUTHENTICATION LOGIC & COMPOSABLES
// ============================================

// Composable for managing authentication
export const useAuth = () => {
  const currentUser = ref(null);

  onMounted(() => {
    // Load user from localStorage on component mount
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      currentUser.value = JSON.parse(saved);
    }
  });

  // LOGIN FUNCTION
  const login = (email, password) => {
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user with matching credentials
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Don't store password in current user session
      const userSession = { id: user.id, name: user.name, email: user.email };
      currentUser.value = userSession;
      localStorage.setItem('currentUser', JSON.stringify(userSession));
      return { success: true, user: userSession };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  // SIGNUP FUNCTION
  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login after signup
    const userSession = { id: newUser.id, name: newUser.name, email: newUser.email };
    currentUser.value = userSession;
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    
    return { success: true, user: userSession };
  };

  // LOGOUT FUNCTION
  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem('currentUser');
  };

  return { 
    currentUser: currentUser, 
    login, 
    signup, 
    logout 
  };
};

// ============================================
// FORM VALIDATION FUNCTIONS
// ============================================

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  return '';
};

// ============================================
// TOAST NOTIFICATION COMPONENT
// ============================================

export const Toast = {
  name: 'Toast',
  components: {
    CheckCircle,
    AlertCircle,
    X
  },
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ['error', 'success'].includes(value)
    },
    onClose: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    onMounted(() => {
      const timer = setTimeout(props.onClose, 4000);
      onUnmounted(() => clearTimeout(timer));
    });

    return {}
  },
  template: `
    <div 
      :class="[
        'fixed top-6 right-6 z-50 max-w-md animate-slide-in text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3',
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
      ]"
    >
      <AlertCircle v-if="type === 'error'" class="w-5 h-5 shrink-0" />
      <CheckCircle v-else class="w-5 h-5 shrink-0" />
      <p class="flex-1 font-medium">{{ message }}</p>
      <button 
        @click="onClose" 
        class="hover:bg-white/20 rounded p-1 transition-colors"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  `
};

// Alternative Toast component using render function (optional maybe)
export const ToastRender = {
  name: 'ToastRender',
  components: {
    CheckCircle,
    AlertCircle,
    X
  },
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ['error', 'success'].includes(value)
    },
    onClose: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    onMounted(() => {
      const timer = setTimeout(props.onClose, 4000);
      onUnmounted(() => clearTimeout(timer));
    });

    return () => {
      const icon = props.type === 'error' 
        ? h(AlertCircle, { class: 'w-5 h-5 shrink-0' })
        : h(CheckCircle, { class: 'w-5 h-5 shrink-0' });

      return h(
        'div',
        {
          class: [
            'fixed top-6 right-6 z-50 max-w-md animate-slide-in text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3',
            props.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          ]
        },
        [
          icon,
          h('p', { class: 'flex-1 font-medium' }, props.message),
          h(
            'button',
            {
              class: 'hover:bg-white/20 rounded p-1 transition-colors',
              onClick: props.onClose
            },
            h(X, { class: 'w-4 h-4' })
          )
        ]
      );
    };
  }
};