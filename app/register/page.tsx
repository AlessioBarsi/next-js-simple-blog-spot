import RegisterForm from "@/components/auth/RegisterForm"
import LinkButton from "@/components/LinkButton";

export default function Register(){
    return (
        <div>
            <LinkButton page="login" text="Already have an account?" />
            <RegisterForm />
        </div>
    );
}