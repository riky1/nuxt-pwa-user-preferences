<script setup>

const { isDark, toggleTheme } = useTheme()

const getIconPath = (type) => {
  return `/assets/icons/${type}-${isDark.value ? 'dark' : 'light'}.svg`
}

const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-book-open',
    to: '/'
  },
  {
    label: 'Docs',
    icon: 'i-heroicons-book-open',
    to: '/docs'
  },
  {
    label: 'Releases',
    icon: 'i-heroicons-rocket-launch',
    to: '/releases'
  }
]

</script>

<template>
  <div class="header__wrapper">
    <nav>
      <ul>
        <li v-for="link in links" key="index">
          <NuxtLink :to="link.to" :title="link.label" class="btn">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="header__right">
      <button class="btn" @click="toggleTheme">
        <img :src="getIconPath('theme')" alt="Theme Icon" />
      </button>
      <button class="btn">
        <img :src="getIconPath('github')" alt="GitHub Icon" />
      </button>
      <button class="btn">
        <img :src="getIconPath('option')" alt="Option Icon" />
      </button>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
// @import '../assets/scss/content-wrapper';

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem; // 12px
  height: var(--header-height);
  
  @extend %content--wrapper;
}

nav {
  ul {
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;

    li {
      list-style: none;

      a {
        color: var(--text-primary);
        font-size: .875rem;
        font-weight: 600;
        line-height: 1.5rem;
        text-decoration: none;
        padding: 5px 10px;
        background-color: transparent;
        border-radius: .375rem;
        // transition: color 0.3s ease;

        // &:hover {
        //   color: var(--text-primary-hover);
        // }

        &.router-link-active {
          color: var(--text-primary-hover); // Colore per il link attivo
          border-bottom: 2px solid var(--text-primary-hover); // Sottolineatura
        }
      }
    }
  }
}

.header__right {
  display: flex;
  gap: 0.25rem;

  @include media-query(lg) {
    gap: 0.5rem;
  }
}
</style>