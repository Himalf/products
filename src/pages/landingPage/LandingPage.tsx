import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision";

type Props = {};

export default function LandingPage({}: Props) {
  return (
    <div>
      <BackgroundBeamsWithCollision>
        <div>Some optional content here</div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
