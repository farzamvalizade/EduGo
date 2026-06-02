import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";

import { sendContact } from "@/services/api/api";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "suggestion",
    subject: "",
    message: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await sendContact(formData);

      setFormData({
        type: "suggestion",
        subject: "",
        message: "",
      });

      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-linear-to-b from-gray-900 via-black to-black text-white"
      dir="rtl"
    >
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-28 pb-30">
        <div className="bg-[#151515] border border-[#262626] rounded-3xl p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-2">ارتباط با ما</h1>

          <p className="text-gray-400 mb-8">
            گزارش باگ، پیشنهادات، سوالات و نظرات خود را برای ما ارسال کنید.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                نوع پیام
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-black border border-[#262626] rounded-xl p-3 outline-none focus:border-custard text-white"
              >
                <option value="bug">گزارش باگ</option>
                <option value="suggestion">پیشنهاد</option>
                <option value="question">سوال</option>
                <option value="other">سایر</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">موضوع</label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="موضوع پیام"
                required
                className="w-full bg-black border border-[#262626] rounded-xl p-3 outline-none focus:border-custard"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">پیام</label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="متن پیام خود را بنویسید..."
                rows={7}
                required
                className="w-full bg-black border border-[#262626] rounded-xl p-3 outline-none resize-none focus:border-custard"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-custard
                text-black
                py-3
                rounded-xl
                font-semibold
                hover:opacity-90
                transition
                disabled:opacity-50
              "
            >
              {loading ? "در حال ارسال..." : "ارسال پیام"}
            </button>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-[#151515] border border-custard/20 rounded-3xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-custard/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-custard"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>

            <h2 className="text-xl font-bold mb-2">پیام با موفقیت ارسال شد</h2>

            <p className="text-gray-400 mb-6">
              از بازخورد شما متشکریم. پیام شما دریافت شد.
            </p>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/home");
              }}
              className="w-full bg-custard text-black font-semibold py-3 rounded-xl hover:opacity-90 transition"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
