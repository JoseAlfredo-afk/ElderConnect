package br.fai.lds.elderconnect.ports_and_adapters.port.service.tools;

import java.io.IOException;

public interface ResourceFilesService {

    String read(final String resourcePath) throws IOException;
}
