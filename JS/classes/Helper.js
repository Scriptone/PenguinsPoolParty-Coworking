class Helper {
	static webhook =
		"https://discord.com/api/webhooks/1104099130600595487/aTY2D5zCTombrH_EcHt2MnRaM4ouqlUAjVe4mhMg3xwxhFAEcdLowAIWuQX6PNSRiPZ7";

	static sendWebhook = async (message) => {
		try {
			await fetch(this.webhook, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content: message }),
			});
		} catch (e) {
			console.log(e);
		}
	};
}

export default Helper;
