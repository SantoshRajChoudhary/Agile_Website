import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { products } from "@/data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const productImages =
    product?.images?.length > 0
      ? product.images
      : product?.image
        ? [product.image]
        : [];

  useEffect(() => {
    setActiveImageIndex(0);
  }, [id]);

  if (!product) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
          <p className="mt-3 text-gray-600">
            The product you are looking for does not exist.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition"
          >
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            {productImages.length > 0 ? (
              <div>
                <div className="relative">
                  <div className="h-[500px] w-full flex items-center justify-center bg-gray-50 rounded-xl shadow">
                    <img
                      src={productImages[activeImageIndex]}
                      alt={`${product.name} ${activeImageIndex + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {productImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIndex((prev) =>
                            prev === 0 ? productImages.length - 1 : prev - 1,
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white w-9 h-9 hover:bg-black/75 transition"
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIndex((prev) =>
                            prev === productImages.length - 1 ? 0 : prev + 1,
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white w-9 h-9 hover:bg-black/75 transition"
                        aria-label="Next image"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {productImages.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {productImages.map((img, index) => (
                      <button
                        key={`${img}-${index}`}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className={`overflow-hidden rounded-lg border-2 transition ${
                          activeImageIndex === index
                            ? "border-blue-600"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="h-20 w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[500px] w-full flex items-center justify-center bg-gray-50 rounded-xl shadow">
                <div className="h-24 w-24 rounded-md bg-gray-200" />
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {product.name}
            </h1>
            <p className="whitespace-pre-line text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {product.features.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Features
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="mt-8 inline-flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Request Quotation
            </button>
          </div>
        </div>
      </div>

      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900">
              Request Quotation
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email and our team will contact you.
            </p>

            {isSubmitted ? (
              <div className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                Thank you. We received your request.
              </div>
            ) : (
              <form
                className="mt-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!email.trim()) return;
                  setIsSubmitted(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
                />

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsQuoteModalOpen(false);
                      setEmail("");
                      setIsSubmitted(false);
                    }}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
