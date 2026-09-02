FROM atelier-workspace
# Atelier image version: 1

# Pi's canvas development dependency needs the Cairo/Pango image stack. Keep the
# native build toolchain available so npm can compile it when no prebuild exists.
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    pkg-config \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev
