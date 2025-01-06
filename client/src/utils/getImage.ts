import EducationImage from "../assets/images/Education.webp"
import HumorImage from "../assets/images/Humor.png"
import PoliticsImage from "../assets/images/Politics.webp"
import TechnologyImage from "../assets/images/Technology.webp"
import ArtImage from "../assets/images/Art.webp"
import ProgrammingImage from "../assets/images/Programming.png"
import TravelImage from "../assets/images/Travel.webp"
import LifestyleImage from "../assets/images/Lifestyle.webp"
import ThoughtImage from "../assets/images/Thought.webp"

export function getImage(selectedCategory){    
        switch (selectedCategory) {
          case "Art":
            return ArtImage;
          case "Education":
            return EducationImage;
          case "Humor":
            return HumorImage;
          case "Lifestyle":
            return LifestyleImage;
          case "Politics":
            return PoliticsImage;
          case "Programming":
            return ProgrammingImage;
          case "Technology":
            return TechnologyImage;
          case "Thought":
            return ThoughtImage;
          case "Travel":
            return TravelImage;
          default:
            break
        }
}