import { Tasklist } from "../components/Tasklist";
export const Mainpage = () => {
  return (
    <div>
      <h1 className="text-3xl font-light text-center mt-12">
        Prueba tecnica semi-senior{" "}
        <strong className="font-bold text-green-800">ivandev</strong>
      </h1>
      <Tasklist></Tasklist>
    </div>
  );
};
