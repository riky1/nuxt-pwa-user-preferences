<script setup>

const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-book-open',
    to: '/'
  },
  {
    label: 'Docs',
    icon: 'i-heroicons-book-open',
    to: '/getting-started'
  },
  {
    label: 'Pro',
    icon: 'i-heroicons-square-3-stack-3d',
    to: '/pro'
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
          <NuxtLink :to="link.to" title="link.label">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="header__right">
      <button class="btn">
        <img src="/assets/icons/sun.svg" alt="">
      </button>
      <button class="btn">
        <img src="/assets/icons/github-light.svg" alt="">
      </button>
      <button class="btn">
        <img src="/assets/icons/option-light.svg" alt="">
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
        padding: 5px 0;
        background-color: transparent;
        border-radius: .375rem;
        transition: color 0.3s ease;

        &:hover {
          color: var(--text-primary-hover);
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

  img {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>