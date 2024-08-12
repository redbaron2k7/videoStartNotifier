import definePlugin from "@utils/types";

const startSound = "https://github.com/redbaron2k7/videoStartNotifier/raw/main/start.mp3";
const stopSound = "https://github.com/redbaron2k7/videoStartNotifier/raw/main/stop.mp3";

export default definePlugin({
    name: "webcamStartNotifier",
    description: "Plays a sound when someone starts/stops their webcam in a voice channel",
    authors: [{ name: "redbaron2k7", id: 1142923640778797157n }],
    patches: [
        {
            find: /VOICE_STATE_UPDATES:function\(e\)\{let\{voiceStates:n\}=e,t=g/,
            replacement: {
                match: /VOICE_STATE_UPDATES:function\(e\)\{let\{voiceStates:n\}=e,t=g[^;]+;/,
                replace: "$&if(!$self.prevStates)$self.prevStates={};const p=e=>new Audio($self.getSound(e)).play();n.forEach(i=>{if(i.selfVideo!==undefined){const prev=$self.prevStates[i.userId];if(prev!==undefined&&prev!==i.selfVideo){p(i.selfVideo)}$self.prevStates[i.userId]=i.selfVideo}});"
            }
        }
    ],
    getSound(isStart) {
        return isStart ? startSound : stopSound;
    },
    prevStates: {}
});