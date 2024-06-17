
import {SignIn, SignUp} from '@clerk/nextjs';

const SignUpPage = () => {
    return <div className={"flex justify-center items-center min-h-screen"}>
        <SignUp
            routing = "hash"
            appearance={{
            elements: {
                rootBox: 'flex justify-center items-center ',
                card: 'bg-emerald-500 shadow-lg rounded-lg p-8',
                cardTitle: 'text-2xl font-semibold mb-4',
                formFieldLabel: 'text-sm font-medium',
                formFieldInput: 'mt-1 block w-full border-gray-300 rounded-md shadow-sm',
                formFieldError: 'text-red-500 text-sm mt-1',
                formButtonPrimary: 'w-full bg-blue-500 text-white py-2 rounded-md mt-4',
            },
        }} />
    </div>;
};

export default SignUpPage;
