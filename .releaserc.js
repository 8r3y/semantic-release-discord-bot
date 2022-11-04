const ref = process.env.GITHUB_REF;
const branch = ref.split('/').pop();

function getPlugins() {
	if (branch === 'master') {
		return [
			'@semantic-release/commit-analyzer',
			'@semantic-release/release-notes-generator',
			['@semantic-release/changelog', {changelogFile: 'CHANGELOG.md'}],
			['@semantic-release/npm', {npmPublish: true, pkgRoot: 'lib'}],
			[
				'@semantic-release/git',
				{
					assets: ['CHANGELOG.md', 'package.json'],
					message: '${nextRelease.version} CHANGELOG [skip ci]\n\n${nextRelease.notes}',
				},
			],
			'@semantic-release/github',
		];
	}
}

module.exports = {
	branches: ['master'],
	plugins: getPlugins(),
};
