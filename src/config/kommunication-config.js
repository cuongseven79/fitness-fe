import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

const APPID = process.env.REACT_APP_KOMMUNICATION_ID;

export const Chatbot = () => Kommunicate.init(APPID, {
	automaticChatOpenOnNavigation: true,
	popupWidget: true,
});