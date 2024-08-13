import definePlugin from "@utils/types";
import { SelectedChannelStore } from "@webpack/common";

const startSound = "https://raw.githubusercontent.com/redbaron2k7/videoStartNotifier//main/start.mp3";
const stopSound = "https://raw.githubusercontent.com/redbaron2k7/videoStartNotifier/main/stop.mp3";

function playNotification(isVideoOn: boolean) {
    new Audio(isVideoOn ? startSound : stopSound).play();
}

export default definePlugin({
    name: "webcamStartNotifier",
    description: "Plays a sound when someone starts/stops their webcam in a voice channel",
    authors: [{ name: "redbaron2k7", id: 1142923640778797157n }],

    flux: (() => {
        const videoStates = new Map<string, boolean>();

        return {
            VOICE_STATE_UPDATES: ({ voiceStates }: { voiceStates: Array<{ userId: string, channelId: string, selfVideo?: boolean; }>; }) => {
                const currentChannelId = SelectedChannelStore.getVoiceChannelId();
                if (!currentChannelId) return;

                voiceStates.forEach(state => {
                    if (state.channelId !== currentChannelId) return;

                    const prevVideoState = videoStates.get(state.userId);
                    if (state.selfVideo !== undefined && prevVideoState !== undefined && prevVideoState !== state.selfVideo) {
                        playNotification(state.selfVideo);
                    }
                    videoStates.set(state.userId, state.selfVideo ?? false);
                });
            }
        };
    })(),
});