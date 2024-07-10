<template>
    <div class="container">
        <h1 class="text-center mt-5 pb-5 ">About Us</h1>
        <p class="text-center">Meet the people behind our shopping company</p>

        <div class="row justify-content-center mt-5">
            <div class="col-md-4" v-for="person in people" :key="person.id">
                <div class="card">
                    <img class="card-img-top mb-5 mb-md-0" :src="require('@/assets/img/' + person.photo)"
                        :alt="person.name" />
                    <div class="card-body">
                        <h5 class="card-title">{{ person.name }}</h5>
                        <p class="card-text">{{ person.title }}</p>
                        <p class="card-text">{{ person.bio }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
<script>
export default {
  data () {
    return {
      people: [
        {
          id: 1,
          name: 'Pierre',
          title: 'CEO',
          bio: 'Pierre is a passionate and visionary leader with over 20 years of experience in the fashion industry. He is the CEO of Fashion Fusion, a leading online fashion retailer that offers the latest fashion trends at affordable prices.',
          photo: 'pierre.jpeg'
        },
        {
          id: 2,
          name: 'Emma',
          title: 'CTO',
          bio: "Emma is a talented and experienced CTO with a passion for innovation and technology. She is responsible for leading Fashion Fusion's technology team and developing new and innovative ways to improve the customer experience.",
          photo: 'emma.jpg'
        },
        {
          id: 3,
          name: 'Fried',
          title: 'CFO',
          bio: "Fried is a seasoned CFO with a deep understanding of finance and accounting. He is responsible for leading Fashion Fusion's finance team and ensuring the company's financial health. Fried has over 20 years of experience in the fashion.",
          photo: 'fried.jpg'
        }
      ]
    }
  }
}
</script>
<style>
.container{
  position: relative;
}
</style>
