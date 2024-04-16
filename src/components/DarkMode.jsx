import { useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DarkMode() {

    const [enabled, setEnabled] = useState(localStorage.getItem('theme') === 'dark');

    const onChange = () => {
      const newEnabled = !enabled;
      setEnabled(newEnabled);
      localStorage.setItem('theme', newEnabled ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newEnabled);
    };

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={onChange}
        className={classNames(
          enabled
            ? "bg-indigo-600 dark:bg-slate-400"
            : "bg-gray-200 dark:bg-white",
          `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 
          border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 
          `
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled
              ? "translate-x-5 dark:bg-slate-600"
              : "translate-x-0 dark:bg-yellow-300",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-yellow-300 shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </Switch.Group>
  );
}




  // TODO: AQUI le estamos diciendo a la web que ya estamos en modo oscuro,
  // estableciendo una clase dark en el atributo class del elemento <html>
  // cuando lo que queremos es que tailwind le diga a la web si estamos 
  // o no, revisar la documentacion de doc de tailwind para evitar ejecutar
  // este metodo.
  // const changeMode = () => {
  //   document.querySelector('html').classList.toggle('dark', enabled);
  // };
  //
  // useEffect(() => {
  //   console.log("ME HE EJECUTADO EL DARK MODE AHORA MISMO ES: ", enabled)
  //   changeMode();
  // }, [enabled]);


  // De esta manera no utilizamos el localStorage pero estaria bn ya que evitamos el uso del useEffect()
  // const [enabled, setEnabled] = useState(false);

  // const onChange = () => {
  //   const newEnabled = !enabled;
  //   setEnabled(newEnabled);
  //   console.log("El modo oscuro ahora está activado: ", newEnabled);

  //   if (newEnabled) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // };