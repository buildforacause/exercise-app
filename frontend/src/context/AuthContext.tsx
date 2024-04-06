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
		authenticated: boolean | null
	}>({
		token: null,
		authenticated: false
	});

	useEffect(() => {
		const loadToken = async () => {
			const token = localStorage.getItem(TOKEN);
			if (token) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				setAuthState({ token: token, authenticated: true });
			}
		}
		loadToken();
	}, []);

	const login = async (request: any) => {
		const response = await HttpRequest("/api/v1/users/login", HTTP_METHODS.POST, request);
		if (response?.success === 1 && response?.token) {
			setAuthState({ token: response.token, authenticated: true });
			localStorage.setItem(TOKEN, response.token);
		}
		return response;
	}

	const logout = async () => {
		localStorage.removeItem(TOKEN);
		setAuthState({ token: null, authenticated: false });
		return true
	}

	const isTokenAvailable = async () => {
		const token = localStorage.getItem(TOKEN);
		return !!token;
	}

	const isAuthenticated = async () => {
		const flag = localStorage.getItem(TOKEN);
		return flag ? true : false;
	}

	const getToken = async () => {
		const token = localStorage.getItem(TOKEN);
		return token;
	}

	const setToken = async (token: string) => {
		localStorage.setItem(TOKEN, token);
	}

	const value = {
		onLogin: login,
		onLogout: logout,
		authenticated: isAuthenticated,
		authState: authState
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};