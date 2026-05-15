import Hero from '../components/Hero/Hero.jsx';
import AlgorithmSteps from '../components/Algorithm/AlgorithmSteps.jsx';
import ComplexityStats from '../components/Complexity/ComplexityStats.jsx';
import FlowVisualization from '../components/Visualization/FlowVisualization.jsx';

const Home = () => {
  return (
    <div className="space-y-20">
      <Hero />
      <AlgorithmSteps />
      <FlowVisualization />
      <ComplexityStats />
    </div>
  );
};

export default Home;
