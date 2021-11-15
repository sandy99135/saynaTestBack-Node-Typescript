"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestObserverResolver {
    static getInstance(server) {
        if (RequestObserverResolver.observerResolver == null) {
            RequestObserverResolver.observerResolver = new RequestObserverResolver();
        }
        RequestObserverResolver.server = server;
        return RequestObserverResolver.observerResolver;
    }
    static appendObsever(obsever) {
        if (RequestObserverResolver.server.obsevers == null) {
            RequestObserverResolver.server.obsevers = new Array();
        }
        RequestObserverResolver.server.obsevers.push(obsever);
    }
}
exports.RequestObserverResolver = RequestObserverResolver;
RequestObserverResolver.observerResolver = null;
RequestObserverResolver.server = null;
//# sourceMappingURL=request-obsever-resolver.js.map