import { ProjectCarousel } from './ProjectCarousel';
import { PROJECTS } from './mock-data';

export function ProjectsShowcase() {
  return <ProjectCarousel projects={PROJECTS} />;
}
