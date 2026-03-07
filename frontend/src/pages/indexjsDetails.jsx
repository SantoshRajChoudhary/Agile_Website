import { useParams } from "react-router-dom";

const IndexJsDetails = () => {
  const { slug } = useParams();

  const formattedTitle = slug.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-[#ffffff] text-black pt-32">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl md:text-5xl font-semibold mb-6 capitalize">
          {formattedTitle}
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed">
          Detailed information about <span className="text-indigo-600 capitalize">{formattedTitle}</span> will be shown here.
          This page can include complete domain explanation, use cases,
          technologies used, workflow, and real-world applications.
        </p>

        {/* Example content block */}
        <div className="mt-10 p-6 rounded-xl bg-gray-50 border border-black/10">
          <h2 className="text-xl font-semibold mb-3">
            About this Service
          </h2>
          <p className="text-gray-600">
            You can now add domain-specific content here such as features,
            benefits, implementation process, and client success stories.
          </p>
        </div>

      </div>
    </div>
  );
};

export default IndexJsDetails;
