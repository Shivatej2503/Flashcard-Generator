// src/pages/CreateFlashcard.jsx
import { FieldArray, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addCard } from "../redux/flashcardSlice";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const FlashcardSchema = Yup.object().shape({
  title: Yup.string().required("Group title is required"),
  description: Yup.string().nullable(),
  terms: Yup.array()
    .of(
      Yup.object().shape({
        term: Yup.string().required("Required"),
        definition: Yup.string().required("Required"),
      })
    )
    .min(1, "Add at least one term"),
});

function readFileAsDataURL(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

export default function CreateFlashcard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const termRefs = useRef([]);
  const [groupImageName, setGroupImageName] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Flashcard</h2>

      <Formik
        initialValues={{
          title: "",
          description: "",
          image: null,
          terms: [{ term: "", definition: "", image: null, fileName: "" }],
        }}
        validationSchema={FlashcardSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(addCard(values));
          resetForm();
          navigate("/my-flashcards");
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            {/* GROUP INFO */}
            <motion.div
              className="card bg-white p-5 rounded-md shadow-md mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <label className="font-medium text-gray-700">Create Group*</label>

              <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2">
                <Field
                  name="title"
                  className="flex-1 p-3 border rounded-md"
                  placeholder="Enter group title"
                />

                {/* UPLOAD IMAGE BUTTON */}
                <div className="flex flex-col items-center">
                  <label className="cursor-pointer border px-4 py-2 rounded-md text-sm hover:bg-gray-50 text-center">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.currentTarget.files?.[0];
                        if (f) {
                          const data = await readFileAsDataURL(f);
                          setFieldValue("image", data);
                          setGroupImageName(f.name); // store file name
                        }
                      }}
                    />
                  </label>

                  {/* SHOW SELECTED FILE NAME */}
                  {groupImageName && (
                    <span className="text-xs text-gray-600 mt-1">
                      {groupImageName}
                    </span>
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}
              <label className="font-medium text-gray-700 block mt-4">
                Add Description
              </label>

              <Field
                as="textarea"
                rows={3}
                name="description"
                className="w-full p-3 border rounded-md mt-2"
                placeholder="Describe the flashcard group..."
              />
            </motion.div>

            {/* TERMS */}
            <FieldArray name="terms">
              {({ push }) => (
                <div className="space-y-4">
                  {values.terms.map((t, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-md border border-gray-200 shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        {/* Number */}
                        <div>
                          <div className="w-8 h-8 rounded-full bg-red-100 text-center leading-8 font-semibold text-red-600">
                            {idx + 1}
                          </div>
                        </div>

                        {/* Inputs */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-700">
                              Enter Term*
                            </label>
                            <Field
                              innerRef={(el) => (termRefs.current[idx] = el)}
                              name={`terms[${idx}].term`}
                              className="w-full p-3 border rounded-md mt-1"
                              placeholder="Enter term"
                            />
                          </div>

                          <div>
                            <label className="text-sm text-gray-700">
                              Enter Definition*
                            </label>
                            <Field
                              name={`terms[${idx}].definition`}
                              as="textarea"
                              rows={2}
                              className="w-full p-3 border rounded-md mt-1"
                              placeholder="Enter definition"
                            />
                          </div>
                        </div>

                        {/* IMAGE SECTION */}
                        <div className="flex flex-col justify-center items-center gap-2 w-[150px] min-h-[100px]">
                          {t.image ? (
                            <>
                              <div className="relative w-[120px] h-[70px] rounded-md overflow-hidden border">
                                <button
                                  type="button"
                                  className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded"
                                  onClick={() =>
                                    setFieldValue(`terms[${idx}]`, {
                                      term: "",
                                      definition: "",
                                      image: null,
                                      fileName: "",
                                    })
                                  }
                                >
                                  X
                                </button>
                                <img
                                  src={t.image}
                                  alt="preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  className="text-sm px-3 py-1 border rounded hover:bg-gray-50"
                                  onClick={() => termRefs.current[idx]?.focus()}
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  className="text-sm px-3 py-1 border rounded text-red-600"
                                  onClick={() =>
                                    setFieldValue(`terms[${idx}]`, {
                                      term: "",
                                      definition: "",
                                      image: null,
                                      fileName: "",
                                    })
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center w-full">
                              <label className="border px-3 py-1 rounded text-sm cursor-pointer hover:bg-gray-50 text-center w-full">
                                Select Image
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const f = e.currentTarget.files?.[0];
                                    if (f) {
                                      const data = await readFileAsDataURL(f);
                                      setFieldValue(`terms[${idx}].image`, data);
                                      setFieldValue(`terms[${idx}].fileName`, f.name);
                                    }
                                  }}
                                />
                              </label>

                              {t.fileName && (
                                <span className="text-xs text-gray-500 mt-1">
                                  {t.fileName}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      push({
                        term: "",
                        definition: "",
                        image: null,
                        fileName: "",
                      });
                      setTimeout(() => {
                        termRefs.current[values.terms.length]?.focus();
                      }, 0);
                    }}
                    className="text-blue-600 font-medium"
                  >
                    + Add more
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="mt-6 flex justify-center">
              <button className="px-6 py-2 bg-red-600 text-white rounded-md">
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
