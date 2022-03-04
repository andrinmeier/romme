FROM antora/antora AS docs
ADD . /antora
RUN ["antora", "antora-playbook.yml"]

FROM pierrezemb/gostatic
COPY --from=docs /antora/build/site /srv/http/


