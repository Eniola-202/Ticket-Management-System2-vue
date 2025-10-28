<template>
  <footer class="px-6 lg:px-12 py-12 bg-blue-950 text-white">
    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-4 gap-12 mb-12">
        
        <div class="md:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <TicketCheckIcon :width="40" :height="40" class="text-indigo-400"/>
            <span class="text-2xl font-bold">Get-Tick-et</span>
          </div>
          <p class="text-gray-400 leading-relaxed">Your one-stop solution for managing tickets.</p>
        </div>
        
        <div>
          <h4 class="font-semibold text-lg mb-4">Product</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Features</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold text-lg mb-4">Company</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Press</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold text-lg mb-4">Support</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Legal</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="pt-8 border-t border-gray-800 text-center flex flex-col md:flex-col justify-center items-center gap-4">
      <p> &copy; 2025 Made with ❤️ by Get-Tick-et. All rights reserved.</p>
      <div class="flex gap-6">
        <a href="#" class="text-gray-400 hover:text-white transition-colors">Facebook</a>
        <a href="#" class="text-gray-400 hover:text-white transition-colors">Twitter</a>
        <a href="#" class="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
        <a href="#" class="text-gray-400 hover:text-white transition-colors">Instagram</a>
      </div>
    </div>
  </footer>
</template>

<script>
import { TicketCheckIcon } from 'lucide-vue-next'

export default {
  name: 'Footer',
  components: {
    TicketCheckIcon
  }
}
</script>