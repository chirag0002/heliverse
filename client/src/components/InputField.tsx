import { ChangeEvent } from "react";

interface LabeledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export const LabeledInput = ({ label, placeholder, onChange, type }: LabeledInputType) => {
    return <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">{label}</label>
        <input onChange={onChange} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-96 p-2.5" placeholder={placeholder} required={true} />
    </div>

}