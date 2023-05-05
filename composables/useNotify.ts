import Notify from "@wcjiang/notify";

function useNotify() {
  const notify = new Notify({
    message: "test message",
    effect: "scroll",
    openurl: "https://www.baidu.com",
    onClick: () => {
      notify.close();
    },
    notification: {
      title: "Count Down", // Set notification title
      icon: "", // Set notification icon, The default is Favicon
      body: "时间到了！", // Set message content
    },
  });
  return notify as Record<string, any>;
}

export default useNotify;
