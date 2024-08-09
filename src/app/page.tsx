import FormNewPost from "@/components/form-new-post";
import { getCurrentUser } from "@/lib/sessions";

export default async function Home() {
  // const user = await getCurrentUser(); // gawe ngetes tok
  // console.log(user);
  

  return (
    <main className="max-w-xl mx-auto my-5">
      <h3 className="text-white text-2xl font-bold mb-4">
      App ku yang ciamik soro rek
      </h3>
      <FormNewPost />
    </main>
  );
}
