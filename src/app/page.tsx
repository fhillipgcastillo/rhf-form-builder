"use client";

import { FormGroupBuilder } from "@/components/formbuilder/FormGroupBuilder";
import { StepBuilder } from "@/components/formbuilder/StepBuilder";
import Link from "next/link";
import { useFormStore } from "@/components/formbuilder/formStore";
import { Stepper } from "@/components/formbuilder/Stepper";

export default function HomePage() {
  const { steps, values, errors } = useFormStore()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-2xl font-bold mb-4">Multi-Step Form Builder</h1>
      <div className="flex flex-col gap-3 w-full p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-2">Step Builder</h2>
                <StepBuilder />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Form Group Builder</h2>
                <FormGroupBuilder />
              </div>
            </div>

          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Dynamic Multi-Step Form</h2>
            <Stepper />
          </div>
        </div>
        <div className="mt-8 flex gap-5 w-full">
          <div className="mt-8 flex-1">
            <h2 className="text-xl font-semibold mb-2">Steps Structure</h2>
            <pre className="bg-gray-100 p-4 rounded text-primary">{JSON.stringify(steps, null, 2)}</pre>
          </div>
          <div className="mt-8 flex-1">
            <h2 className="text-xl font-semibold mb-2">Form State</h2>
            <pre className="bg-gray-100 p-4 rounded text-primary">{JSON.stringify(values, null, 2)}</pre>
            <div className="mt-8 flex-1">
            <h2 className="text-xl font-semibold mb-2">Errors State</h2>
            <pre className="bg-gray-100 p-4 rounded text-primary">{JSON.stringify(errors, null, 2)}</pre>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
