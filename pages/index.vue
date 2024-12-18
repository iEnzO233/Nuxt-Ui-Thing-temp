<script setup>
const showToast = () => {
  console.log(useSonner)
  useSonner.success("", {description: "انجام شد"});
}
</script>

<template>
  <div class="container">
    <div class="text-center">
      <UiCard>
        <UiButton class="btn">Link Hover 1</UiButton>
      </UiCard>
    </div>
  </div>
</template>

