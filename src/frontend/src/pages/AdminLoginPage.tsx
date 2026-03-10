import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Shield, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function AdminLoginPage() {
  const { login, isLoggingIn, isLoginError, isInitializing, identity } =
    useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [identity, navigate]);

  return (
    <div className="min-h-screen bg-dental-dark flex items-center justify-center px-4">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, oklch(0.65 0.1 195) 0%, transparent 50%), radial-gradient(circle at 75% 75%, oklch(0.78 0.12 85) 0%, transparent 50%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-10 max-w-sm w-full text-center"
        data-ocid="admin.panel"
      >
        <div className="w-16 h-16 dental-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Stethoscope size={28} className="text-white" />
        </div>

        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
          <Shield size={13} className="text-dental-teal-light" />
          <span className="text-white/60 text-xs font-medium">
            Admin Portal
          </span>
        </div>

        <h1 className="font-display font-bold text-3xl text-white mb-2">
          DentaCare Admin
        </h1>
        <p className="text-white/50 text-sm mb-8">
          Sign in securely to access the clinic management dashboard.
        </p>

        {isInitializing ? (
          <div className="flex justify-center" data-ocid="admin.loading_state">
            <Loader2
              size={24}
              className="animate-spin text-dental-teal-light"
            />
          </div>
        ) : (
          <Button
            onClick={() => login()}
            disabled={isLoggingIn}
            size="lg"
            className="w-full bg-dental-teal hover:bg-dental-teal-dark text-white rounded-full font-semibold"
            data-ocid="admin.login.primary_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in with Internet Identity"
            )}
          </Button>
        )}

        {isLoginError && (
          <p
            className="mt-4 text-red-400 text-sm"
            data-ocid="admin.error_state"
          >
            Sign-in failed. Please try again.
          </p>
        )}
      </motion.div>
    </div>
  );
}
