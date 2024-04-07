import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { HTTP_METHODS, HttpRequest } from "../services/ApiService";

const TOKEN = "token";

interface AuthProps {
	authState?: {
		token: string | null;
		authenticated: boolean | null;
	};
	onLogin?: (request) => Promise<any>;
	onLogout?: () => Promise<any>;
	authenticated?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
	const [authState, setAuthState] = useState<{
		token: string | null,
		authenticated: boolean | null,
		user: string | null
	}>({
		token: null,
		authenticated: false,
		user: null
	});

	useEffect(() => {
		const loadToken = async () => {
			const token = localStorage.getItem(TOKEN);
			const user = localStorage.getItem("user");
			if (token) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				setAuthState({ token: token, authenticated: true, user:user });
			}
		}
		loadToken();
	}, []);

	const login = async (request: any) => {
		const response = await HttpRequest("/api/v1/auth/login", HTTP_METHODS.POST, request);
		if (response?.success === 1 && response?.token) {
			setAuthState({ token: response.token, authenticated: true, user:response.user });
			localStorage.setItem(TOKEN, response.token);
			localStorage.setItem("user", response.user);
		}
		return response;
	}

	const logout = async () => {
		localStorage.removeItem(TOKEN);
		localStorage.removeItem("user");
		setAuthState({ token: null, authenticated: false, user: null });
		return true
	}

	const isAuthenticated = async () => {
		const flag = localStorage.getItem(TOKEN);
		return flag ? true : false;
	}

	const value = {
		onLogin: login,
		onLogout: logout,
		authenticated: isAuthenticated,
		authState: authState
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};