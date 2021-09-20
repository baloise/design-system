@Library('jenkins-library@master') _

pipeline {
    agent {
        label 'buildah'
    }

    stages {
        stage('Build and Push') {
            steps {
                script {
                    currentBuild.description = GIT_COMMIT
                }
                containerBuild(repository: "baloise-design-system/docs", tags: [GIT_COMMIT])
            }
        }
    }
}
