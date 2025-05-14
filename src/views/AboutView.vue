<template>
  <!-- Add this section after features -->
  <section class="about-us">
    <div class="container">
      <div class="about-grid">
        <div class="about-content">
          <h2>Our Legacy of Fitness Excellence</h2>
          <p class="lead">Since 2008, PowerFit has been transforming lives through cutting-edge fitness solutions and
            holistic wellness programs.</p>
          <div class="mission-statement">
            <div class="decorative-line"></div>
            <p>We believe in empowering individuals to reach their peak physical potential through science-backed
              training methodologies and personalized coaching.</p>
          </div>
          <div class="stats-grid">
            <div class="stat-card">
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>
            <div class="stat-card">
              <h3>50k+</h3>
              <p>Members Transformed</p>
            </div>
            <div class="stat-card">
              <h3>200+</h3>
              <p>Fitness Awards</p>
            </div>
          </div>
        </div>
        <div class="about-visual">
          <div class="main-image">
            <img src="images/about-main.jpg" alt="Our Gym Facility">
          </div>
          <div class="badge-certification">
            <i class="fas fa-award"></i>
            <span>Certified Excellence<br>2024 Fitness Leader</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* About Us Premium Styles */
.about-us {
  padding: 8rem 0;
  background: linear-gradient(45deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
}

.about-us::before {
  content: '';
  position: absolute;
  top: -50px;
  left: -50px;
  width: 200px;
  height: 200px;
  background: var(--primary-gradient);
  opacity: 0.08;
  border-radius: 30% 70% 70% 30%;
  animation: float 25s infinite;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.about-content h2 {
  font-size: 2.8rem;
  margin-bottom: 2rem;
  color: var(--dark-color);
  position: relative;
  padding-left: 1.5rem;
}

.about-content h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: var(--secondary-color);
}

.lead {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 2.5rem;
}

.mission-statement {
  position: relative;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 3rem;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.mission-statement:hover {
  transform: translateY(-5px);
}

.decorative-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--primary-gradient);
  border-radius: 2px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 77, 77, 0.05);
  border-radius: 12px;
  border: 2px solid rgba(255, 77, 77, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 77, 77, 0.1);
  transform: translateY(-3px);
}

.stat-card h3 {
  font-size: 2.2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.about-visual {
  position: relative;
  margin-left: 4rem;
}

.main-image {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  transform: rotate(-2deg);
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: rotate(0deg);
}

.main-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.badge-certification {
  position: absolute;
  bottom: -30px;
  right: -30px;
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transform: rotate(5deg);
  transition: all 0.3s ease;
}

.badge-certification:hover {
  transform: rotate(0deg) translateY(-5px);
}

.badge-certification i {
  font-size: 2.5rem;
  color: var(--secondary-color);
}

@keyframes float {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(10px, 10px) rotate(5deg);
  }

  50% {
    transform: translate(-10px, 15px) rotate(-5deg);
  }

  75% {
    transform: translate(15px, -10px) rotate(3deg);
  }
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .about-visual {
    margin-left: 0;
    order: -1;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .main-image img {
    height: 400px;
  }

  .badge-certification {
    right: 0;
    bottom: -20px;
  }
}
</style>