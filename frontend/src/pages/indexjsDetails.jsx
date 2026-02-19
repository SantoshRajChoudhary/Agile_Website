import { useParams } from "react-router-dom";

const IndexJsDetails = () => {
  const { slug } = useParams();

  const formattedTitle = slug.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-[#020817] text-white pt-32">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl md:text-5xl font-semibold mb-6 capitalize">
          {formattedTitle}
        </h1>

        <p className="text-gray-400 text-lg leading-relaxed">
          Detailed information about <span className="text-teal-400 capitalize">{formattedTitle}</span> will be shown here.
          This page can include complete domain explanation, use cases,
          technologies used, workflow, and real-world applications.
        </p>

        {/* Example content block */}
        <div className="mt-10 p-6 rounded-xl bg-[#0B1220] border border-white/10">
          <h2 className="text-xl font-semibold mb-3">
            About this Service
          </h2>
          <p className="text-gray-400">
            You can now add domain-specific content here such as features,
            benefits, implementation process, and client success stories.
          </p>
        </div>

      </div>
    </div>
  );
};

export default IndexJsDetails;
