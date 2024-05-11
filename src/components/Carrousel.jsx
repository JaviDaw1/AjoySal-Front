import { Carousel } from "flowbite-react";

export default function Component() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={5000}>
        <img src="https://content.skyscnr.com/m/2dcd7d0e6f086057/original/GettyImages-186142785.jpg?resize=2560px:1707px" alt="..." />
        <img src="https://hips.hearstapps.com/hmg-prod/images/sandwich-en-rollitos-1674032576.jpg?crop=1xw:0.843558282208589xh;center,top&resize=1200:*" alt="..." />
        <img src="https://blog.contraelcancer.es/wp-content/uploads/2020/03/iStock-1017706758-mod.jpg" alt="..." />
        <img src="https://www.bupasalud.com/sites/default/files/inline-images/bupa_598072389.jpg" alt="..." />
        <img src="https://s3.abcstatics.com/media/gurmesevilla/2012/01/comida-rapida-casera.jpg" alt="..." />
      </Carousel>
    </div>
  );
}
