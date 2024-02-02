import Calculator from "./Calculator";
import Title from "./Title";
import Carousel from "../CarouselCustom";

function BMI() {
  return (
    <section className="flex justify-center ">
      <div className="container ">
        <div className="w-fit mx-auto space-y-10">
          <Title />
          <Calculator />
        </div>
      </div>
      <div className="w-full">
        <Carousel />
      </div>
    </section>
  );
}
export default BMI;
